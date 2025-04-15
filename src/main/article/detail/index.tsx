import { Flex } from "antd"
import React from "react"
import ArticleItem from "../../../components/ui/ArticleItem"

type Props = {}

const DetailArticlePage = (props: Props) => {
  return (
    <Flex
      align="center"
      style={{
        maxWidth: "938px",
        alignSelf: "center",
      }}
    >
      <ArticleItem.Large />
    </Flex>
  )
}

export default DetailArticlePage
