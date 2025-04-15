import { Button, Flex, Input, Typography } from "antd"
import React from "react"
import { Link } from "react-router"
import { clientRoutes } from "../../router"

type Props = {}

const SignInPage = (props: Props) => {
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
        Sign In
      </Typography.Title>

      <Flex vertical gap={12}>
        <Flex vertical gap={2}>
          <Typography.Title level={5}>Email address</Typography.Title>
          <Input type="email" placeholder="Email address" />
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>Password</Typography.Title>
          <Input.Password placeholder="Password" />
        </Flex>
      </Flex>

      <Flex vertical gap={2} align="center" className="w-full">
        <Button type="primary" className="w-full">
          Login
        </Button>
        <Typography.Text>
          Don't have an account? <Link to={clientRoutes.signUp}>Sign Up</Link>
        </Typography.Text>
      </Flex>
    </Flex>
  )
}

export default SignInPage
