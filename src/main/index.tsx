import { Flex } from "antd"
import React from "react"
import { Link } from "react-router"
import { routes } from "../router"

const ListPage = () => {
  return (
    <Flex>
      list page <Link to={routes.signUp}>go to signUp</Link>
    </Flex>
  )
}

export default ListPage
