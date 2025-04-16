import { clientRoutes } from "@/router/index"
import { useAppDispatch } from "@/store/redux"
import { loginUser } from "@/store/slices/Users"
import { Button, Flex, Input, Typography } from "antd"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

type Props = {}

const SignInPage = (props: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function handleLogin(data: any) {
    if (!isValid) return
    try {
      dispatch(loginUser(data))
      navigate(clientRoutes.articles.index)
    } catch (error) {
      console.error("rejected", error)
    }
  }

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
      <form noValidate onSubmit={handleSubmit(handleLogin)}>
        <Typography.Title
          level={2}
          style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, alignSelf: "center" }}
        >
          Sign In
        </Typography.Title>

        <Flex vertical gap={12}>
          <Flex vertical gap={2}>
            <Typography.Title level={5}>Email address</Typography.Title>
            <Controller
              control={control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
                minLength: {
                  value: 3,
                  message: "Email must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Email must be less than 50 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input {...field} status={fieldState.error ? "error" : ""} placeholder="Email address" />
                  {fieldState.error && (
                    <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                      {fieldState.error.message}
                    </Typography.Text>
                  )}
                </>
              )}
            />
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>Password</Typography.Title>
            <Controller
              control={control}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 40,
                  message: "Password must be less than 40 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password {...field} status={fieldState.error ? "error" : ""} placeholder="Password" />
                  {fieldState.error && (
                    <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                      {fieldState.error.message}
                    </Typography.Text>
                  )}
                </>
              )}
            />
          </Flex>
        </Flex>

        <Flex vertical gap={2} align="center" className="w-full">
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
          <Typography.Text>
            Don't have an account? <Link to={clientRoutes.signUp}>Sign Up</Link>
          </Typography.Text>
        </Flex>
      </form>
    </Flex>
  )
}

export default SignInPage
