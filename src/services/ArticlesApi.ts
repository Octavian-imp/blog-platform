import { TypeArticleItem } from "@/store/slices/Article"
import fetchWithToken from "@/utils/fetchWithUser"

export type TypeCreateArticle = {
  title: string
  description: string
  body: string
  tagList: string[]
  token: string
}

export type TypeUpdateArticle = Omit<TypeCreateArticle, "tagList">

export default class ArticlesApi {
  private static baseUrl = "https://blog-platform.kata.academy/api"

  static async fetchArticles(options?: {
    limit?: string
    offset?: string
    tag?: string
    favorited?: string
    author?: string
  }): Promise<{ articles: Array<TypeArticleItem>; articlesCount: number }> {
    const params = new URLSearchParams(options).toString()
    const response = await fetch(`${this.baseUrl}/articles?${params}`)
    const data: { articles: Array<TypeArticleItem>; articlesCount: number } = await response.json()
    if (data instanceof Error) {
      throw new Error("Failed to fetch articles")
    }
    return data
  }

  static async fetchArticlesByTag(slug: string) {
    const response = await fetch(`${this.baseUrl}/articles/${slug}`)
    const data: { article: TypeArticleItem } = await response.json()
    return data.article
  }

  static async create({ title, description, body, tagList, token }: TypeCreateArticle) {
    const response = await fetchWithToken(`${this.baseUrl}/articles`, token, {
      body: JSON.stringify({ article: { title, description, body, tagList } }),
      method: "POST",
    }).then((res) => res.json())
    const data: { article: TypeArticleItem } | Error = await response
    if (data instanceof Error) {
      throw new Error("Failed to create article")
    }
    return data
  }

  static async delete(slug: string, token: string) {
    const response = await fetchWithToken(`${this.baseUrl}/articles/${slug}`, token, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete article")
    }
    return response.status === 200
  }

  static async update({ title, description, body, slug, token }: TypeUpdateArticle & { slug: string }) {
    const response = await fetchWithToken(`${this.baseUrl}/articles/${slug}`, token, {
      body: JSON.stringify({ article: { title, description, body } }),
      method: "PUT",
    }).then((res) => res.json())
    const data: { article: TypeArticleItem } = await response
    return data.article
  }
}
