import { configureStore, createSelector } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import ArticleReducer from "./slices/Article"
import { UsersReducer } from "./slices/Users"

export const store = configureStore({
  reducer: {
    articles: ArticleReducer,
    users: UsersReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
export const createAppSelector = createSelector.withTypes<AppState>()
