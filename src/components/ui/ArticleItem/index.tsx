import { Button, Flex, Image, Popover, Skeleton, Tag, Typography } from "antd"
import Title from "antd/es/typography/Title"

import { clientRoutes } from "@/router"
import ArticlesApi from "@/services/ArticlesApi"
import { useAppDispatch, useAppSelector } from "@/store/redux"
import { addFavorite, removeFavorite, TypeArticleItem } from "@/store/slices/Article"
import { selectUser } from "@/store/slices/Users"
import cn from "@/utils/classnames"
import useIsAuth from "@/utils/useIsAuth"
import { orange, red } from "@ant-design/colors"
import { HeartFilled, HeartOutlined, InfoCircleFilled } from "@ant-design/icons"
import { format } from "date-fns"
import React, { useEffect, useLayoutEffect, useState } from "react"
import Markdown from "react-markdown"
import { Link, useNavigate, useParams } from "react-router"
import styles from "./index.module.scss"

const ArticleItem = ({
  author,
  title,
  favoritesCount,
  tagList,
  description,
  createdAt,
  slug,
  favorited,
}: TypeArticleItem) => {
  const dispatch = useAppDispatch()
  const isAuth = useIsAuth()

  function favorite() {
    if (!isAuth) return
    console.log("favorited", favorited)

    if (favorited) {
      dispatch(removeFavorite(slug)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          console.log(res)
        }
        return
      })
    } else {
      dispatch(addFavorite(slug)).then((res) => {
        if (!res) return
        console.log(res)
      })
    }
  }

  return (
    <Flex align="flex-start" justify="space-between" className={styles.container} gap={85}>
      <Flex vertical>
        <Flex align="center" gap={13}>
          <Link to={`${clientRoutes.articles.index}/${slug}`} className={styles.title}>
            {title}
          </Link>
          <button className={cn(styles.favorite, { [styles.disabled]: !isAuth })} disabled={!isAuth} onClick={favorite}>
            {isAuth ? (
              favorited ? (
                <HeartFilled style={{ fontSize: "1rem", color: red["5"] }} />
              ) : (
                <HeartOutlined style={{ fontSize: "1rem" }} />
              )
            ) : (
              <HeartOutlined style={{ fontSize: "1rem", color: "#ccc" }} />
            )}
            {favoritesCount}
          </button>
        </Flex>
        <Flex align="center" gap={8}>
          {tagList.map((tag, index) => (
            <Tag key={index} className={styles.tagItem}>
              {tag}
            </Tag>
          ))}
        </Flex>
        <Typography.Text className={styles.previewDescription}>{description}</Typography.Text>
      </Flex>
      <Flex align="center" className="align" gap={12}>
        <Flex vertical>
          <Title level={4} className={styles.username}>
            {author.username}
          </Title>
          <Typography.Text className={styles.createdAtArticle}>{format(createdAt, "MMM dd, yyyy")}</Typography.Text>
        </Flex>
        <Image
          src={author.image}
          style={{ objectFit: "cover", borderRadius: "50%" }}
          height={46}
          width={46}
          alt="user avatar"
          preview={false}
        />
      </Flex>
    </Flex>
  )
}

ArticleItem.Large = ({ slug }: { slug: string }) => {
  // FIXME: если убрать статью из избранного, то она не изменит свой статус в ui
  const params: Readonly<Partial<{ slug: string }>> = useParams()
  const [article, setArticle] = useState<TypeArticleItem | null>(null)

  const user = useAppSelector(selectUser)
  const isAuthor = user.username === article?.author?.username
  const navigate = useNavigate()
  const isAuth = useIsAuth()
  const dispatch = useAppDispatch()

  const [openDeletePopover, setOpenDeletePopover] = useState(false)

  useLayoutEffect(() => {
    if (typeof params.slug === "undefined") return
    ArticlesApi.fetchArticlesByTag(params.slug, user.token)
      .then((data) => {
        console.log(data)
        setArticle(data)
      })
      .catch((error) => {
        console.error("Error fetching article:", error)
      })
  }, [params.slug])

  function handleDelete() {
    if (!isAuthor) return
    ArticlesApi.delete(slug, user.token).then((res) => {
      if (res) {
        navigate(clientRoutes.articles.index)
      }
    })
  }

  if (article === null) {
    return <Skeleton style={{ backgroundColor: "white", padding: "14px 15px", borderRadius: "5px" }} active />
  }

  function favorite() {
    if (!isAuth || !article) return

    if (article.favorited) {
      dispatch(removeFavorite(slug)).then((res) => {
        if ("error" in res) {
          console.log(res)
          return
        }
        setArticle(res.payload)
      })
    } else {
      dispatch(addFavorite(slug)).then((res) => {
        if ("error" in res) return
        setArticle(res.payload)
      })
    }
  }

  function PopoverConfirmDelete() {
    return (
      <Typography.Text className="flex flex-col">
        <Flex gap={8} style={{ marginBottom: "12px" }}>
          <InfoCircleFilled style={{ color: orange["5"] }} />
          Are you sure to delete this article?
        </Flex>
        <Flex gap={2} justify="flex-end">
          <Button type="primary" size="small" onClick={handleDelete} style={{ width: "fit-content" }}>
            Yes
          </Button>
          <Button style={{ width: "fit-content" }} size="small" onClick={() => setOpenDeletePopover(false)}>
            No
          </Button>
        </Flex>
      </Typography.Text>
    )
  }

  return (
    <Flex vertical style={{ backgroundColor: "white", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", width: "100%" }}>
      <Flex
        align="flex-start"
        justify="space-between"
        className={styles.container}
        style={{ boxShadow: "none" }}
        gap={85}
      >
        <Flex vertical>
          <Flex align="center" gap={13}>
            <Link to="#" className={styles.title}>
              {article.title}
            </Link>
            <button
              className={cn(styles.favorite, { [styles.disabled]: !isAuth })}
              onClick={favorite}
              disabled={!isAuth}
            >
              {isAuth ? (
                article.favorited ? (
                  <HeartFilled style={{ fontSize: "1rem", color: red["5"] }} />
                ) : (
                  <HeartOutlined style={{ fontSize: "1rem" }} />
                )
              ) : (
                <HeartOutlined style={{ fontSize: "1rem", color: "#ccc" }} />
              )}
              {article.favoritesCount}
            </button>
          </Flex>
          <Flex align="center" gap={8}>
            {article.tagList.map((tag, index) => (
              <Tag key={index} className={styles.tagItem}>
                {tag}
              </Tag>
            ))}
          </Flex>
          <Typography.Text className={styles.previewDescription}>{article.description}</Typography.Text>
        </Flex>
        <Flex vertical align="flex-end" gap={30}>
          <Flex align="center" className="align" gap={12}>
            <Flex vertical>
              <Title level={4} className={styles.username}>
                {article.author.username}
              </Title>
              <Typography.Text className={styles.createdAtArticle}>
                {format(article.createdAt, "MMM dd, yyyy")}
              </Typography.Text>
            </Flex>
            <Image
              src={`${article.author.image}`}
              style={{ objectFit: "cover", borderRadius: "50%" }}
              height={46}
              width={46}
              alt="user avatar"
              preview={false}
            />
          </Flex>
          {isAuthor && (
            <Flex gap={12}>
              <Popover
                trigger={"click"}
                title="Delete article"
                open={openDeletePopover}
                onOpenChange={(open) => setOpenDeletePopover(open)}
                placement="rightTop"
                content={PopoverConfirmDelete}
              >
                <Button danger>Delete</Button>
              </Popover>
              <Link to={clientRoutes.articles.edit(slug)}>
                <Button color="green" variant="outlined">
                  Edit
                </Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Typography.Text style={{ padding: "25px 42px 16px 16px" }}>
        <Markdown>{article.body}</Markdown>
      </Typography.Text>
    </Flex>
  )
}

export default ArticleItem
