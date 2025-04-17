import { useAppSelector } from "@/store/redux"
import { logoutUser, selectUser } from "@/store/slices/Users"
import useIsAuth from "@/utils/useIsAuth"
import { Button, Flex, Image } from "antd"
import React from "react"
import { Link, Outlet } from "react-router"
import { clientRoutes } from "../../../router"
import styles from "./index.module.scss"

import { useDispatch } from "react-redux"

const HeaderLayout = () => {
  const isAuth = useIsAuth()
  return (
    <Flex vertical gap={26}>
      <Flex className={styles.header} align="center" justify="space-between">
        <Link to={clientRoutes.index}>Realworld Blog</Link>
        {isAuth ? <HeaderLayout.AuthMenu /> : <HeaderLayout.GuestMenu />}
      </Flex>
      <Outlet />
    </Flex>
  )
}

HeaderLayout.GuestMenu = () => {
  return (
    <Flex gap={19} align="center">
      <Link to={clientRoutes.signIn}>Sign In</Link>
      <Link to={clientRoutes.signUp} className={styles["btn-outline-success"]}>
        Sign Up
      </Link>
    </Flex>
  )
}

HeaderLayout.AuthMenu = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useDispatch()

  function logout() {
    dispatch(logoutUser())
  }

  return (
    <Flex gap={26} align="center">
      <Link to={clientRoutes.articles.create} className={styles["btn-outline-success"]}>
        Create article
      </Link>
      <Link to={clientRoutes.profile} className={"items-center flex gap-2 font-normal text-lg"}>
        {user.username}
        <Image
          preview={false}
          width={46}
          height={46}
          style={{ objectFit: "cover", borderRadius: "50%" }}
          src={user.image || "../../../assets/img/user.png"}
        />
      </Link>
      <Button type="default" className={styles["btn-outline"]} onClick={logout}>
        Log Out
      </Button>
    </Flex>
  )
}

export default HeaderLayout
