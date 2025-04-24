import ArticlesApi from "@/services/ArticlesApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../redux"

// selectors
export const selectArticles = (state: AppState) => state.articles.value
export const selectArticlesCount = (state: AppState) => state.articles.count

// async thunks
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (
    options: { limit?: string; offset?: string; tag?: string; favorited?: string; author?: string },
    { rejectWithValue, getState }
  ) => {
    const state = getState() as AppState
    const response = await ArticlesApi.fetchArticles(options, state.users.token)
    if (response instanceof Error) {
      return rejectWithValue("Failed to fetch articles")
    }
    const data: { articles: Array<TypeArticleItem>; articlesCount: number } = response
    return data
  }
)

export const addFavorite = createAsyncThunk(
  "articles/addFavorite",
  async (slug: string, { rejectWithValue, getState }) => {
    const state = getState() as AppState
    const response = await ArticlesApi.favorite(slug, state.users.token)
    if (response instanceof Error) {
      return rejectWithValue("Failed to add favorite")
    }
    const data: TypeArticleItem = response
    return data
  }
)
export const removeFavorite = createAsyncThunk(
  "articles/removeFavorite",
  async (slug: string, { rejectWithValue, getState }) => {
    const state = getState() as AppState
    const response = await ArticlesApi.unfavorite(slug, state.users.token)
    if (response instanceof Error) {
      return rejectWithValue("Failed to remove favorite")
    }
    const data: TypeArticleItem = response
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
  error: null | { message: string; code: number }
} = {
  value: [],
  count: 0,
  error: null,
}

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        return { error: null, count: action.payload.articlesCount, value: action.payload.articles }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        return { ...state, error: { message: action.error.message || "Unknown error", code: 0 } }
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        // console.log("pending", action)

        return {
          ...state,
          value: state.value.map((item) =>
            item.slug === action.payload.slug
              ? { ...item, favorited: true, favoritesCount: item.favoritesCount + 1 }
              : item
          ),
        }
      })
      .addCase(addFavorite.rejected, (state, action) => {
        return {
          ...state,
          error: { message: action.error.message || "Unknown error", code: 0 },
        }
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        return {
          ...state,
          value: state.value.map((item) =>
            item.slug === action.payload.slug
              ? { ...item, favorited: false, favoritesCount: item.favoritesCount - 1 }
              : item
          ),
        }
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        console.log("rejected", action)
        return {
          ...state,
          error: { message: action.error.message || "Unknown error", code: 0 },
        }
      })
  },
})

export default articleSlice.reducer
