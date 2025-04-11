import React from "react"
import { ActionFunctionArgs, RouteProps } from "react-router"

import ListPage from "../main"
import ArticlePage from "../main/article"
import CreateArticlePage from "../main/article/create"
import EditArticlePage from "../main/article/edit"
import SignUpPage from "../main/signUp"
import SignInPage from "../main/signIn"

export const routes = Object.freeze({
  index: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  article: {
    index: "/article",
    create: "/article/create",
    edit: "/article/edit",
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
    path: routes.article.index,
    element: <ArticlePage />,
  },
  {
    path: routes.article.create,
    element: <CreateArticlePage />,
  },
  {
    path: routes.article.edit,
    element: <EditArticlePage />,
  },
]

export default router
