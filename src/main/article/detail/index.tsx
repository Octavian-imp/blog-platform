import { Flex } from "antd"
import React from "react"
import ArticleItem from "../../../components/ui/ArticleItem"
import { useLocation, useParams } from "react-router"

type Props = {}

const DetailArticlePage = (props: Props) => {
  const location = useLocation()
  const params = useParams()
  console.log(location.pathname, params)
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
