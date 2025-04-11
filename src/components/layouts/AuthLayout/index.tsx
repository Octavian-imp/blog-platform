import React from "react"
import { Outlet } from "react-router"

type Props = {}

const AuthLayout = (props: Props) => {
  return (
    <>
      <div>AuthLayout</div>
      <Outlet />
    </>
  )
}

export default AuthLayout
