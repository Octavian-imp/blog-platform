import { Flex, Pagination } from "antd"
import React from "react"
import ArticleItem from "../components/ui/ArticleItem"

const ListPage = () => {
  return (
    <Flex vertical align="center" gap={26}>
      <ArticleItem />
      <Pagination align="center" defaultCurrent={1} total={5000} showSizeChanger={false} />
    </Flex>
  )
}

export default ListPage
