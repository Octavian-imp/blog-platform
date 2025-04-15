import { Flex, Pagination } from "antd"
import React from "react"
import ArticleItem from "../components/ui/ArticleItem"
import { useLocation, useParams } from "react-router"

const ListPage = () => {
  const location = useLocation()
  const params = useParams()
  console.log(location.pathname, params)

  return (
    <Flex vertical align="center" gap={26}>
      <ArticleItem />
      <Pagination align="center" defaultCurrent={1} total={5000} showSizeChanger={false} />
    </Flex>
  )
}

export default ListPage
