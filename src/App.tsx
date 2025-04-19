import React from "react"
import { Route, Routes } from "react-router"
import HeaderLayout from "./components/layouts/HeaderLayout"
import ListPage from "./main"
import ProfilePage from "./main/Profile"
import CreateArticlePage from "./main/article/create"
import DetailArticlePage from "./main/article/detail"
import EditArticlePage from "./main/article/edit"
import SignInPage from "./main/signIn"
import SignUpPage from "./main/signUp"
import { router } from "./router"
import AuthLayout from "./components/layouts/AuthLayout"

const App = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route index element={<ListPage />} />
        <Route path={router.signIn} element={<SignInPage />} />
        <Route path={router.signUp} element={<SignUpPage />} />
        <Route path={router.articles.index} element={<ListPage />} />
        <Route element={<AuthLayout />}>
          <Route path={router.profile} element={<ProfilePage />} />
          <Route path={router.articles.index}>
            <Route path={router.articles.create} element={<CreateArticlePage />} />
            <Route path={":slug"} element={<DetailArticlePage />} />
            <Route path={":slug/edit"} element={<EditArticlePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
