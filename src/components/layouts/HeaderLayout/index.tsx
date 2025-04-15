import { Flex } from "antd"
import React from "react"
import { Link, Outlet } from "react-router"
import { routes } from "../../../router"
import styles from "./index.module.scss"

const HeaderLayout = () => {
  return (
    <Flex vertical gap={26}>
      <Flex className={styles.header} align="center" justify="space-between">
        <div>Realworld Blog</div>
        <Flex gap={19} align="center">
          <Link to={routes.signIn}>Sign In</Link>
          <Link to={routes.signUp} className={styles.signUp}>
            Sign Up
          </Link>
        </Flex>
      </Flex>
      <Outlet />
    </Flex>
  )
}

export default HeaderLayout
