import { Alert, Flex, Pagination, Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import ArticleItem from "../components/ui/ArticleItem"
import { useAppDispatch, useAppSelector } from "../store/redux"
import { fetchArticles, selectArticles, selectArticlesCount } from "../store/slices/Article"

const ListPage = () => {
  const dispatch = useAppDispatch()
  const articles = useAppSelector(selectArticles)
  const articlesError = useAppSelector((state) => state.articles.error)
  const articlesCount = useAppSelector(selectArticlesCount)
  const [currentPage, setCurrentPage] = useState<number>(1)

  function handleChangePage(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispatch(fetchArticles({ offset: String(currentPage === 1 ? 0 : currentPage* articles.length) }))
  }, [currentPage])

  if (articlesError !== null) {
    return (
      <Flex
        style={{
          maxWidth: "938px",
          alignSelf: "center",
          width: "100%",
          backgroundColor: "white",
          padding: "15px 14px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: "5px",
        }}
        align="center"
        vertical
        gap={20}
      >
        <Alert message="Error" description={articlesError.message} type="error" style={{ width: "100%" }} />
      </Flex>
    )
  }

  if (articles.length === 0) {
    return (
      <Flex style={{ maxWidth: "938px", alignSelf: "center", width: "100%" }} align="center" vertical gap={20}>
        <Skeleton style={{ backgroundColor: "white", padding: "14px 15px", borderRadius: "5px" }} />
        <Skeleton style={{ backgroundColor: "white", padding: "14px 15px", borderRadius: "5px" }} />
        <Skeleton style={{ backgroundColor: "white", padding: "14px 15px", borderRadius: "5px" }} />
      </Flex>
    )
  }

  return (
    <Flex vertical align="center" gap={26}>
      {articles.map((item) => (
        <ArticleItem key={item.slug} {...item} />
      ))}
      <Pagination
        align="center"
        defaultCurrent={1}
        current={currentPage}
        onChange={(page) => handleChangePage(page)}
        total={articlesCount}
        pageSize={articles.length}
        showSizeChanger={false}
      />
    </Flex>
  )
}

export default ListPage
