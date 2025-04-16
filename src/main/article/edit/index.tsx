import ArticlesApi from "@/services/ArticlesApi"
import { useAppSelector } from "@/store/redux"
import { selectToken } from "@/store/slices/Users"
import { Button, Flex, Input, Typography } from "antd"
import TextArea from "antd/es/input/TextArea"
import React, { useLayoutEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useParams } from "react-router"
import { ArticleForm } from "../create"

const EditArticlePage = () => {
  const params = useParams()
  const token = useAppSelector(selectToken)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<Omit<ArticleForm, "tags">>({
    defaultValues: {
      title: "",
      description: "",
      body: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  useLayoutEffect(() => {
    if (typeof params.slug === "undefined") return
    ArticlesApi.fetchArticlesByTag(params.slug)
      .then((data) => {
        setValue("title", data.title)
        setValue("description", data.description)
        setValue("body", data.body)
      })
      .catch((error) => {
        console.error("Error fetching article:", error)
      })
  }, [params.slug])

  function onSubmit(data: Omit<ArticleForm, "tags">) {
    if (!isValid) return

    ArticlesApi.update({
      body: data.body,
      description: data.description,
      title: data.title,
      slug: params.slug as string,
      token,
    }).then((article) => {
      console.log(article)
    })
  }

  return (
    <form
      noValidate
      style={{ width: "100%", maxWidth: "938px", alignSelf: "center" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        style={{
          backgroundColor: "white",
          padding: "14px 15px",
          boxShadow: "0 4px 12px rgba(#000, .5)",
          borderRadius: "5px",
          width: "100%",
        }}
        align="center"
        vertical
        gap={20}
      >
        <Typography.Title style={{ fontSize: "20px", fontWeight: "500", lineHeight: "28px" }}>
          Edit article
        </Typography.Title>

        <Flex vertical style={{ width: "100%" }}>
          <Typography.Title level={5}>Title</Typography.Title>
          <Controller
            name="title"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <Input {...field} placeholder="Title" status={fieldState.error ? "error" : undefined} />
            )}
          />
        </Flex>
        <Flex vertical style={{ width: "100%" }}>
          <Typography.Title level={5}>Short description</Typography.Title>

          <Controller
            name="description"
            rules={{ required: "This field is required" }}
            control={control}
            render={({ field, fieldState }) => (
              <Input {...field} placeholder="Short description" status={fieldState.error ? "error" : undefined} />
            )}
          />
        </Flex>
        <Flex vertical style={{ width: "100%" }}>
          <Typography.Title level={5}>Text</Typography.Title>
          <Controller
            name="body"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                status={fieldState.error ? "error" : undefined}
                autoSize={{ minRows: 4, maxRows: 10 }}
                placeholder="Text"
              />
            )}
          />
        </Flex>

        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Send
        </Button>
      </Flex>
    </form>
  )
}

export default EditArticlePage
