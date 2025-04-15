import { Button, Flex, Input, Space, Typography } from "antd"
import TextArea from "antd/es/input/TextArea"
import React, { useState } from "react"

type Props = {}

const CreateArticlePage = (props: Props) => {
  const [tagsArr, setTagsArr] = useState<Array<{ id: number; value: string }>>([
    { id: new Date().getTime(), value: "" },
  ])

  return (
    <Flex
      style={{
        backgroundColor: "white",
        padding: "14px 15px",
        boxShadow: "0 4px 12px rgba(#000, .5)",
        borderRadius: "5px",
        maxWidth: "938px",
        alignSelf: "center",
        width: "100%",
      }}
      align="center"
      vertical
      gap={20}
    >
      <Typography.Title style={{ fontSize: "20px", fontWeight: "500", lineHeight: "28px" }}>
        Create new article
      </Typography.Title>

      <Flex vertical style={{ width: "100%" }}>
        <Typography.Title level={5}>Title</Typography.Title>
        <Input placeholder="Title" />
      </Flex>
      <Flex vertical style={{ width: "100%" }}>
        <Typography.Title level={5}>Short description</Typography.Title>
        <Input placeholder="Short description" />
      </Flex>
      <Flex vertical style={{ width: "100%" }}>
        <Typography.Title level={5}>Text</Typography.Title>
        <TextArea placeholder="Title" autoSize={{ minRows: 4, maxRows: 10 }} />
      </Flex>

      <Flex vertical style={{ width: "100%" }}>
        <Typography.Title level={5}>Tags</Typography.Title>
        <Flex vertical gap={4}>
          {tagsArr.map((item) => (
            <Space.Compact key={item.id} style={{ width: "50%" }}>
              <Input placeholder="tags" defaultValue={item.value} />
              <Button
                danger
                onClick={() => {
                  setTagsArr((prev) => prev.filter((tag) => tag.id !== item.id))
                }}
              >
                delete
              </Button>
              <Button
                type="primary"
                onClick={() => setTagsArr((prev) => [...prev, { id: new Date().getTime(), value: "" }])}
              >
                Add
              </Button>
            </Space.Compact>
          ))}
        </Flex>
      </Flex>

      <Button type="primary" style={{ width: "100%" }}>
        Send
      </Button>
    </Flex>
  )
}

export default CreateArticlePage
