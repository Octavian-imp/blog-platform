import React from "react"
import { Route, Routes } from "react-router"
import HeaderLayout from "./components/layouts/HeaderLayout"
import router, { routes } from "./router"

const App = () => {
  return (
    <Routes>
      <Route path={routes.index} element={<HeaderLayout />}>
        {router.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
