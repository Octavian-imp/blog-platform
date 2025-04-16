import ArticlesApi from "@/services/ArticlesApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../redux"

// selectors
export const selectArticles = (state: AppState) => state.articles.value
export const selectArticlesCount = (state: AppState) => state.articles.count

// async thunks
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (options?: { limit?: string; offset?: string; tag?: string; favorited?: string; author?: string }) => {
    const response = await ArticlesApi.fetchArticles(options)
    const data: { articles: Array<TypeArticleItem>; articlesCount: number } = response
    return data
  }
)

export type TypeArticleItem = {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: Array<string>
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    image: string
    following: boolean
  }
}

const initialState: {
  value: Array<TypeArticleItem>
  count: number
} = {
  value: [],
  count: 0,
}

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      return { count: action.payload.articlesCount, value: action.payload.articles }
    })
  },
})

export default articleSlice.reducer
