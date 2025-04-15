import React from "react"
import { Route, Routes } from "react-router"
import HeaderLayout from "./components/layouts/HeaderLayout"
import ListPage from "./main"
import CreateArticlePage from "./main/article/create"
import DetailArticlePage from "./main/article/detail"
import SignInPage from "./main/signIn"
import SignUpPage from "./main/signUp"
import { router } from "./router"
import ProfilePage from "./main/Profile"

const App = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route index element={<ListPage />} />
        <Route path={router.signIn} element={<SignInPage />} />
        <Route path={router.signUp} element={<SignUpPage />} />
        <Route path={router.profile} element={<ProfilePage />} />
        <Route path={router.articles.index}>
          <Route index element={<ListPage />} />
          <Route path={router.articles.create} element={<CreateArticlePage />} />
          <Route path={":id"} element={<DetailArticlePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
