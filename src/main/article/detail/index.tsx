import ArticleItem from "@/components/ui/ArticleItem"
import ArticlesApi from "@/services/ArticlesApi"
import { TypeArticleItem } from "@/store/slices/Article"
import { Flex, Skeleton } from "antd"
import React, { useLayoutEffect, useState } from "react"
import { useParams } from "react-router"

const DetailArticlePage = () => {
  const params: Readonly<Partial<{ slug: string }>> = useParams()

  // if (!article) {
  //   return (
  //     <Flex style={{ maxWidth: "938px", alignSelf: "center", width: "100%" }} align="center" vertical gap={20}>
  //       <Skeleton style={{ backgroundColor: "white", padding: "14px 15px", borderRadius: "5px" }} />
  //     </Flex>
  //   )
  // }

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
