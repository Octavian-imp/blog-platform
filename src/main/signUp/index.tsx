import { clientRoutes } from "@/router/index"
import { useAppDispatch } from "@/store/redux"
import { createUser } from "@/store/slices/Users"
import { SerializedError } from "@reduxjs/toolkit"
import { Button, Checkbox, Divider, Flex, Input, Typography } from "antd"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

const SignUpPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { isValid },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      agreement: false,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  function onSubmit(data: any) {
    if (!isValid) return
    dispatch(createUser(data))
      .then((res) => {
        if ("error" in res) {
          throw new Error((res.payload as SerializedError).message)
        }
        navigate(clientRoutes.articles.index)
      })
      .catch((error) => {
        alert(error.message)
      })
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography.Title
          level={2}
          style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, alignSelf: "center" }}
        >
          Create new account
        </Typography.Title>

        <Flex vertical gap={12}>
          <Flex vertical gap={2}>
            <Typography.Title level={5}>Username</Typography.Title>
            <Controller
              control={control}
              name="username"
              rules={{
                required: {
                  value: true,
                  message: "Username is required",
                },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be less than 20 characters",
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    {...field}
                    status={fieldState.error ? "error" : ""}
                    autoComplete="off"
                    placeholder="Username"
                  />
                  {fieldState.error && (
                    <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                      {fieldState.error.message}
                    </Typography.Text>
                  )}
                </>
              )}
            />
          </Flex>
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
                deps: ["repeatPassword"],
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
          <Flex vertical>
            <Typography.Title level={5}>Repeat password</Typography.Title>

            <Controller
              control={control}
              name="repeatPassword"
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
                validate: (match) => {
                  const password = getValues("password")
                  return match === password || "Passwords do not match"
                },
                deps: ["password"],
              }}
              render={({ field, fieldState }) => (
                <>
                  <Input.Password {...field} status={fieldState.error ? "error" : ""} placeholder="Repeat password" />
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

        <Flex vertical>
          <Divider style={{ margin: "0" }} />

          <Controller
            control={control}
            name="agreement"
            rules={{
              required: {
                value: true,
                message: "You must agree to the terms and conditions",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  style={{ fontSize: "14px", fontWeight: "400", lineHeight: "22px", justifyContent: "flex-start" }}
                >
                  I agree to the processing of my personal information
                </Checkbox>
                {fieldState.error?.message && (
                  <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                    {fieldState.error.message}
                  </Typography.Text>
                )}
              </>
            )}
          />
        </Flex>

        <Flex vertical gap={2} align="center" className="w-full">
          <Button type="primary" htmlType="submit" className="w-full">
            Create
          </Button>
          <Typography.Text>
            Already have an account? <Link to={clientRoutes.signIn}>Sign In</Link>
          </Typography.Text>
        </Flex>
      </form>
    </Flex>
  )
}

export default SignUpPage
