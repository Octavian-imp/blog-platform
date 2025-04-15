import { Flex, Image } from "antd"
import React from "react"
import { Link, Outlet } from "react-router"
import { clientRoutes } from "../../../router"
import styles from "./index.module.scss"

const HeaderLayout = () => {
  return (
    <Flex vertical gap={26}>
      <Flex className={styles.header} align="center" justify="space-between">
        <Link to={clientRoutes.index}>Realworld Blog</Link>
        <HeaderLayout.AuthMenu />
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
  return (
    <Flex gap={26} align="center">
      <Link to={clientRoutes.articles.create} className={styles["btn-outline-success"]}>
        Create article
      </Link>
      <Link to={clientRoutes.profile} className={"items-center flex gap-2 font-normal text-lg"}>
        username
        <Image preview={false} width={46} height={46} src={"../../../assets/img/user.png"} />
      </Link>
      <Link to={"#"} className={styles["btn-outline"]}>
        Log Out
      </Link>
    </Flex>
  )
}

export default HeaderLayout
