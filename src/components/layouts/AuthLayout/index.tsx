import { clientRoutes } from "@/router"
import useIsAuth from "@/utils/useIsAuth"
import React from "react"
import { Navigate, Outlet } from "react-router"

const AuthLayout = () => {
  const isAuth = useIsAuth()
  if (!isAuth) {
    return <Navigate to={clientRoutes.signIn} />
  }

  return <Outlet />
}

export default AuthLayout
