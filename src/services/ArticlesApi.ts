import { TypeArticleItem } from "@/store/slices/Article"
import fetchWithToken from "@/utils/fetchWithUser"

export type TypeCreateArticle = {
  title: string
  description: string
  body: string
  tagList: string[]
  token: string
}

export type TypeUpdateArticle = TypeCreateArticle

export default class ArticlesApi {
  private static baseUrl = "https://blog-platform.kata.academy/api"

  static async fetchArticles(
    options?: {
      limit?: string
      offset?: string
      tag?: string
      favorited?: string
      author?: string
    },
    token?: string
  ): Promise<{ articles: Array<TypeArticleItem>; articlesCount: number }> {
    const params = new URLSearchParams(options).toString()
    const response = await fetchWithToken(`${this.baseUrl}/articles?${params}`, token || "")
    const data: { articles: Array<TypeArticleItem>; articlesCount: number } = await response.json()
    if (data instanceof Error) {
      throw new Error("Failed to fetch articles")
    }
    return data
  }

  static async fetchArticlesByTag(slug: string, token?: string) {
    const response = await fetchWithToken(`${this.baseUrl}/articles/${slug}`, token || "")
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
    console.log(response)

    if (!response.ok) {
      throw new Error("Failed to delete article")
    }
    return response.ok
  }

  static async update({ title, description, body, tagList, slug, token }: TypeUpdateArticle & { slug: string }) {
    const response = await fetchWithToken(`${this.baseUrl}/articles/${slug}`, token, {
      body: JSON.stringify({ article: { title, description, body, tagList } }),
      method: "PUT",
    }).then((res) => res.json())
    const data: { article: TypeArticleItem } = await response
    return data.article
  }

  static async favorite(slug: string, token: string) {
    const response = await fetchWithToken(`${this.baseUrl}/articles/${slug}/favorite`, token, {
      method: "POST",
    })
    const data: { article: TypeArticleItem } = await response.json()
    return data.article
  }
  static async unfavorite(slug: string, token: string) {
    const response = await fetchWithToken(`${this.baseUrl}/articles/${slug}/favorite`, token, {
      method: "DELETE",
    })
    const data: { article: TypeArticleItem } = await response.json()
    return data.article
  }
}
