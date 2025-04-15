import { Button, Flex, Image, Popover, Tag, Typography } from "antd"
import Title from "antd/es/typography/Title"

import { orange } from "@ant-design/colors"
import { HeartOutlined, InfoCircleFilled } from "@ant-design/icons"
import { format } from "date-fns"
import React, { useState } from "react"
import Markdown from "react-markdown"
import { Link } from "react-router"
import { clientRoutes } from "../../../router"
import cn from "../../../utils/classnames"
import styles from "./index.module.scss"

type Props = {}

const ArticleItem = (props: Props) => {
  return (
    <Flex align="flex-start" justify="space-between" className={styles.container} gap={85}>
      <Flex vertical>
        <Flex align="center" gap={13}>
          <Link to={`${clientRoutes.articles.index}/12`} className={styles.title}>
            Some article title
          </Link>
          <button className={cn(styles.favorite, { [styles.disabled]: true })}>
            <HeartOutlined style={{ fontSize: "1rem" }} />
            13
          </button>
        </Flex>
        <Flex align="center" gap={8}>
          <Tag className={styles.tagItem}>Tag</Tag>
          <Tag className={styles.tagItem}>Tag</Tag>
          <Tag className={styles.tagItem}>Tag</Tag>
        </Flex>
        <Typography.Text className={styles.previewDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at incidunt voluptatum. Odit, corporis
          pariatur eos adipisci, porro dignissimos sint nostrum modi delectus ex consectetur asperiores maiores at
          dolorem dolorum! Dolorem voluptatum placeat quasi laborum accusamus beatae rerum animi similique? Dolor
          dolorum ad cupiditate, nostrum, quis cumque tempore veritatis iste repellat vel ipsa numquam ipsam sit
          aliquam, sunt dolore eaque.
        </Typography.Text>
      </Flex>
      <Flex align="center" className="align" gap={12}>
        <Flex vertical>
          <Title level={4} className={styles.username}>
            John Doe
          </Title>
          <Typography.Text className={styles.createdAtArticle}>{format(new Date(), "MMM dd, yyyy")}</Typography.Text>
        </Flex>
        <Image src="../assets/img/user.png" height={46} width={46} alt="user avatar" preview={false} />
      </Flex>
    </Flex>
  )
}

ArticleItem.Large = () => {
  const [openDeletePopover, setOpenDeletePopover] = useState(false)

  function PopoverConfirmDelete() {
    return (
      <Typography.Text className="flex flex-col">
        <Flex gap={8} style={{ marginBottom: "12px" }}>
          <InfoCircleFilled style={{ color: orange["5"] }} />
          Are you sure to delete this article?
        </Flex>
        <Flex gap={2} justify="flex-end">
          <Button type="primary" size="small" style={{ width: "fit-content" }}>
            Yes
          </Button>
          <Button style={{ width: "fit-content" }} size="small">
            No
          </Button>
        </Flex>
      </Typography.Text>
    )
  }

  return (
    <Flex vertical style={{ backgroundColor: "white", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}>
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
              Some article title
            </Link>
            <button className={styles.favorite}>
              <HeartOutlined style={{ fontSize: "1rem" }} />
              13
            </button>
          </Flex>
          <Flex align="center" gap={8}>
            <Tag className={styles.tagItem}>Tag</Tag>
            <Tag className={styles.tagItem}>Tag</Tag>
            <Tag className={styles.tagItem}>Tag</Tag>
          </Flex>
          <Typography.Text className={styles.previewDescription}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae at incidunt voluptatum. Odit, corporis
            pariatur eos adipisci, porro dignissimos sint nostrum modi delectus ex consectetur asperiores maiores at
            dolorem dolorum! Dolorem voluptatum placeat quasi laborum accusamus beatae rerum animi similique? Dolor
            dolorum ad cupiditate, nostrum, quis cumque tempore veritatis iste repellat vel ipsa numquam ipsam sit
            aliquam, sunt dolore eaque.
          </Typography.Text>
        </Flex>
        <Flex vertical align="flex-end" gap={30}>
          <Flex align="center" className="align" gap={12}>
            <Flex vertical>
              <Title level={4} className={styles.username}>
                John Doe
              </Title>
              <Typography.Text className={styles.createdAtArticle}>
                {format(new Date(), "MMM dd, yyyy")}
              </Typography.Text>
            </Flex>
            <Image src="../assets/img/user.png" height={46} width={46} alt="user avatar" preview={false} />
          </Flex>
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
            <Button color="green" variant="outlined">
              Edit
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Typography.Text style={{ padding: "25px 42px 16px 16px" }}>
        <Markdown>
          ```Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil iure accusantium impedit provident quae
          fugit, amet, possimus iusto esse quis deserunt facere ad? Assumenda ipsum dolor eos molestias ad ducimus!```
        </Markdown>
      </Typography.Text>
    </Flex>
  )
}

export default ArticleItem
