import ArticleItem from "@/components/ui/ArticleItem"
import { Flex } from "antd"
import React from "react"
import { useParams } from "react-router"

const DetailArticlePage = () => {
  const params: Readonly<Partial<{ slug: string }>> = useParams()

  return (
    <Flex
      align="center"
      style={{
        maxWidth: "938px",
        alignSelf: "center",
        width: "100%",
      }}
    >
      <ArticleItem.Large slug={params.slug!} />
    </Flex>
  )
}

export default DetailArticlePage
