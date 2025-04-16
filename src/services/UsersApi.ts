import fetchWithToken from "@/utils/fetchWithUser"

export type TypeUser = { token: string; email: string; username: string; bio: string; image: string }

export default class UsersApi {
  private static baseUrl = "https://blog-platform.kata.academy/api"

  static async create({ username, email, password }: Pick<TypeUser, "username" | "email"> & { password: string }) {
    try {
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

      const data: { user: TypeUser } = await response.json()
      return data.user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async login({ email, password }: { email: string; password: string }) {
    try {
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
      const data: { user: TypeUser } = await response.json()
      return data.user
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async update({
    username,
    email,
    password,
    token,
    image,
  }: Pick<TypeUser, "username" | "email" | "image"> & { password: string; token: string }) {
    try {
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
      const data: { user: TypeUser } = await response.json()
      return data.user
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
