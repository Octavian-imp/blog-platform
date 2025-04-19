import ArticlesApi from "@/services/ArticlesApi"
import { useAppSelector } from "@/store/redux"
import { selectToken } from "@/store/slices/Users"
import { Button, Flex, Input, Space, Typography } from "antd"
import TextArea from "antd/es/input/TextArea"
import React, { useLayoutEffect } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
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
  } = useForm<ArticleForm>({
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tags: [{ id: new Date().getTime(), value: "" }],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  })

  const {
    fields: tagFields,
    append,
    remove,
  } = useFieldArray({ control, name: "tags", rules: { required: true, minLength: 1 } })

  useLayoutEffect(() => {
    if (typeof params.slug === "undefined") return
    ArticlesApi.fetchArticlesByTag(params.slug)
      .then((data) => {
        setValue("title", data.title)
        setValue("description", data.description)
        setValue("body", data.body)
        setValue(
          "tags",
          data.tagList.map((tag) => ({ id: new Date().getTime(), value: tag }))
        )
      })
      .catch((error) => {
        console.error("Error fetching article:", error)
      })
  }, [params.slug])

  function onSubmit(data: ArticleForm) {
    if (!isValid) return

    ArticlesApi.update({
      body: data.body,
      description: data.description,
      title: data.title,
      tagList: data.tags.map((tag) => tag.value).filter((tag) => tag.trim().length > 0),
      slug: params.slug as string,
      token,
    })
      .then((article) => {
        console.log(article)
      })
      .catch((error) => {
        console.error("Error updating article:", error)
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
        <Flex vertical style={{ width: "100%" }}>
          <Typography.Title level={5}>Tags</Typography.Title>
          <Flex vertical gap={4}>
            {tagFields.map((item, index) => (
              <Controller
                key={item.id}
                name={`tags.${index}.value`}
                control={control}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 1",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Space.Compact key={item.id} style={{ width: "50%" }}>
                    <Input {...field} defaultValue={field.value} status={fieldState.error ? "error" : undefined} />
                    <Button
                      danger
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      delete
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (fieldState.error || field.value.trim().length === 0) return
                        append({ id: new Date().getTime(), value: "" })
                      }}
                    >
                      Add
                    </Button>
                  </Space.Compact>
                )}
              />
            ))}
          </Flex>
        </Flex>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Send
        </Button>
      </Flex>
    </form>
  )
}

export default EditArticlePage
