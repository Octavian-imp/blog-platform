import React from "react"
import { RouteProps } from "react-router"

import ListPage from "../main"
import CreateArticlePage from "../main/article/create"
import EditArticlePage from "../main/article/edit"
import SignInPage from "../main/signIn"
import SignUpPage from "../main/signUp"

export const routes = Object.freeze({
  index: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  articles: {
    index: "/articles",
    create: "/create",
    edit: "/edit",
    detail: ":slug",
  },
} as const)

const router: Array<RouteProps> = [
  {
    path: routes.index,
    index: true,
    element: <ListPage />,
  },
  {
    path: routes.signUp,
    element: <SignUpPage />,
  },
  {
    path: routes.signIn,
    element: <SignInPage />,
  },
  {
    path: routes.articles.index,
    element: <ListPage />,
    children: <>hello</>,
  },
  {
    path: routes.articles.detail,
    element: <ListPage />,
  },
  {
    path: routes.articles.create,
    element: <CreateArticlePage />,
  },
  {
    path: routes.articles.edit,
    element: <EditArticlePage />,
  },
]

export default router
