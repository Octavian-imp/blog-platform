import { Button, Flex, Image, Popover, Tag, Typography } from "antd"
import Title from "antd/es/typography/Title"

import ArticlesApi from "@/services/ArticlesApi"
import { useAppSelector } from "@/store/redux"
import { selectUser } from "@/store/slices/Users"
import { orange } from "@ant-design/colors"
import { HeartOutlined, InfoCircleFilled } from "@ant-design/icons"
import { format } from "date-fns"
import React, { useState } from "react"
import Markdown from "react-markdown"
import { Link, useNavigate } from "react-router"
import { clientRoutes } from "../../../router"
import { TypeArticleItem } from "../../../store/slices/Article"
import cn from "../../../utils/classnames"
import styles from "./index.module.scss"

const ArticleItem = ({ author, title, favoritesCount, tagList, description, createdAt, slug }: TypeArticleItem) => {
  return (
    <Flex align="flex-start" justify="space-between" className={styles.container} gap={85}>
      <Flex vertical>
        <Flex align="center" gap={13}>
          <Link to={`${clientRoutes.articles.index}/${slug}`} className={styles.title}>
            {title}
          </Link>
          <button className={cn(styles.favorite, { [styles.disabled]: true })}>
            <HeartOutlined style={{ fontSize: "1rem" }} />
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

ArticleItem.Large = ({
  author,
  title,
  favoritesCount,
  tagList,
  description,
  createdAt,
  body,
  favorited,
  slug,
}: TypeArticleItem) => {
  const user = useAppSelector(selectUser)
  const isAuthor = user.username === author.username
  const navigate = useNavigate()

  const [openDeletePopover, setOpenDeletePopover] = useState(false)

  function handleDelete() {
    if (!isAuthor) return
    ArticlesApi.delete(slug, user.token).then((res) => {
      if (res) {
        navigate(clientRoutes.articles.index)
      }
    })
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
              {title}
            </Link>
            <button className={styles.favorite}>
              <HeartOutlined style={{ fontSize: "1rem" }} />
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
        <Flex vertical align="flex-end" gap={30}>
          <Flex align="center" className="align" gap={12}>
            <Flex vertical>
              <Title level={4} className={styles.username}>
                {author.username}
              </Title>
              <Typography.Text className={styles.createdAtArticle}>{format(createdAt, "MMM dd, yyyy")}</Typography.Text>
            </Flex>
            <Image
              src={`${author.image}`}
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
        <Markdown>{body}</Markdown>
      </Typography.Text>
    </Flex>
  )
}

export default ArticleItem
