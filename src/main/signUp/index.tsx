import { Button, Checkbox, Divider, Flex, Input, Typography } from "antd"
import React, { useState } from "react"
import { Link } from "react-router"
import { clientRoutes } from "../../router"

type Props = {}

const SignUpPage = (props: Props) => {
  const [agreement, setAgreement] = useState(false)

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
        Create new account
      </Typography.Title>

      <Flex vertical gap={12}>
        <Flex vertical gap={2}>
          <Typography.Title level={5}>Username</Typography.Title>
          <Input placeholder="Username" />
        </Flex>
        <Flex vertical gap={2}>
          <Typography.Title level={5}>Email address</Typography.Title>
          <Input type="email" placeholder="Email address" />
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>Password</Typography.Title>
          <Input.Password placeholder="Password" autoComplete="off" />
        </Flex>
        <Flex vertical>
          <Typography.Title level={5}>Repeat password</Typography.Title>
          <Input.Password placeholder="Password" autoComplete="off" />
        </Flex>
      </Flex>

      <Flex vertical>
        <Divider style={{ margin: "0" }} />
        <Checkbox
          checked={agreement}
          onChange={(e) => setAgreement(e.target.checked)}
          style={{ fontSize: "14px", fontWeight: "400", lineHeight: "22px", justifyContent: "flex-start" }}
        >
          I agree to the processing of my personal information
        </Checkbox>
      </Flex>

      <Flex vertical gap={2} align="center" className="w-full">
        <Button type="primary" className="w-full">
          Create
        </Button>
        <Typography.Text>
          Already have an account? <Link to={clientRoutes.signIn}>Sign In</Link>
        </Typography.Text>
      </Flex>
    </Flex>
  )
}

export default SignUpPage
