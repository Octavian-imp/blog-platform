import fetchWithToken from "@/utils/fetchWithUser"
import { SerializedError } from "@reduxjs/toolkit"

export type TypeUser = { token: string; email: string; username: string; bio: string; image: string }

export default class UsersApi {
  private static baseUrl = "https://blog-platform.kata.academy/api"

  static async create({
    username,
    email,
    password,
  }: Pick<TypeUser, "username" | "email"> & { password: string }): Promise<TypeUser | SerializedError> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => err)
    const data: { user: TypeUser } | { errors: { [key: string]: string } } = await response
    if ("errors" in data) {
      let error: SerializedError = { message: "" }
      for (const key in data.errors) {
        error.message = error.message?.concat(`${key} ${data.errors[key]}\n`)
      }
      return Promise.reject(error)
    }
    return Promise.resolve(data.user)
  }

  static async login({ email, password }: { email: string; password: string }): Promise<TypeUser | SerializedError> {
    const response = await fetch(`${this.baseUrl}/users/login`, {
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .catch((err) => err)
    const data: { user: TypeUser } | { errors: { [key: string]: string } } = await response
    if ("errors" in data) {
      let error: SerializedError = { message: "" }
      for (const key in data.errors) {
        error.message = error.message?.concat(`${key} ${data.errors[key]}\n`)
      }
      return Promise.reject(error)
    }
    return Promise.resolve(data.user)
  }

  static async update({
    username,
    email,
    password,
    token,
    image,
  }: Pick<TypeUser, "username" | "email" | "image"> & { password: string; token: string }): Promise<
    TypeUser | SerializedError
  > {
    const response = await fetchWithToken(`${this.baseUrl}/user`, token, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => err)
    const data: { user: TypeUser } | { errors: { [key: string]: string } } = await response
    if ("errors" in data) {
      let error: SerializedError = { message: "" }
      for (const key in data.errors) {
        error.message = error.message?.concat(`${key} ${data.errors[key]}\n`)
      }
      return Promise.reject(error)
    }
    return Promise.resolve(data.user)
  }
}
