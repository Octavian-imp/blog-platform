import { clientRoutes } from "@/router"
import { useAppDispatch, useAppSelector } from "@/store/redux"
import { selectUser, updateUser } from "@/store/slices/Users"
import { SerializedError } from "@reduxjs/toolkit"
import { Button, Flex, Input, Typography } from "antd"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"

type Props = {}

const ProfilePage = (props: Props) => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      newPassword: "",
      avatarUrl: user.image,
    },
  })

  function onSubmit(data: any) {
    if (!isValid) return
    console.log(data)
    dispatch(updateUser({ ...data, password: data.newPassword, image: data.avatarUrl }))
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography.Title
          level={2}
          style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 500, alignSelf: "center" }}
        >
          Edit Profile
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
            <Typography.Title level={5}>New password</Typography.Title>
            <Controller
              control={control}
              name="newPassword"
              rules={{
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
          <Flex vertical>
            <Typography.Title level={5}>Avatar URL</Typography.Title>
            <Controller control={control} name="avatarUrl" render={({ field }) => <Input {...field} type="url" />} />
          </Flex>

          <Button type="primary" htmlType="submit" className="w-full">
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default ProfilePage
