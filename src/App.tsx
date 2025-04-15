import React from "react"
import { Route, Routes } from "react-router"
import HeaderLayout from "./components/layouts/HeaderLayout"
import ListPage from "./main"
import DetailArticlePage from "./main/article/detail"
import SignInPage from "./main/signIn"
import SignUpPage from "./main/signUp"
import { routes } from "./router"

const App = () => {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route index element={<ListPage />} />
        <Route path={routes.signIn} element={<SignInPage />} />
        <Route path={routes.signUp} element={<SignUpPage />} />
        <Route path="article-slug" element={<DetailArticlePage />} />
        <Route path="articles">
          <Route index element={<ListPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
