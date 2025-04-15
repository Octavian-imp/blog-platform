import { Button, Flex, Form, Input, Typography } from "antd"
import React from "react"
import { Link } from "react-router"
import { clientRoutes } from "../../router"

type Props = {}

const ProfilePage = (props: Props) => {
  return (
    <Flex
      vertical
      style={{
        backgroundColor: "white",
        maxWidth: "384px",
        width: "100%",
        boxShadow: "0 4px 12px rgba(#000, 0.5)",
        borderRadius: "5px",
        alignSelf: "center",
        padding: "48px 33px",
      }}
      gap={20}
    >
      <Typography.Title
        level={2}
        style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, alignSelf: "center" }}
      >
        Edit Profile
      </Typography.Title>

      {/* <Flex vertical gap={12}>
        <Flex vertical gap={2}>
          <Typography.Title level={5}>Username</Typography.Title>
          <Input placeholder="Username" />
        </Flex>
        <Flex vertical gap={2}>
          <Typography.Title level={5}>Email address</Typography.Title>
          <Input type="email" placeholder="Email address" />
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>New password</Typography.Title>
          <Input.Password placeholder="Password" autoComplete="off" />
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>Avatar URL</Typography.Title>
          <Input type="url" placeholder="Avatar image" autoComplete="off" />
        </Flex>
      </Flex> */}
      <Form layout="vertical">
        <Form.Item label="Username" name="username" rules={[{ required: true, message: "Username" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email" }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="New password" name="newPassword" rules={[{ required: true, message: "Password" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Avatar URL" name="avatarUrl" rules={[{ required: true, message: "Avatar image" }]}>
          <Input type="url" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className="w-full">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default ProfilePage
