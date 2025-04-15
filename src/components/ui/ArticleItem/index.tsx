import { Flex, Image, Tag, Typography } from "antd"
import Title from "antd/es/typography/Title"

import { format } from "date-fns"
import { Heart } from "lucide-react"
import React from "react"
import Markdown from "react-markdown"
import { Link } from "react-router"
import styles from "./index.module.scss"

type Props = {}

const ArticleItem = (props: Props) => {
  return (
    <Flex align="flex-start" justify="space-between" className={styles.container} gap={85}>
      <Flex vertical>
        <Flex align="center" gap={13}>
          <Link to="#" className={styles.title}>
            Some article title
          </Link>
          <button className={styles.favorite}>
            <Heart size={16} />
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
              <Heart size={16} />
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
      <Typography.Text style={{ padding: "25px 42px 16px 16px" }}>
        <Markdown>[Markdown here](#)</Markdown>
      </Typography.Text>
    </Flex>
  )
}

export default ArticleItem
