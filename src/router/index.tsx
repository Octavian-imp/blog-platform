export const router = Object.freeze({
  index: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/profile",
  articles: {
    index: "articles",
    create: "create",
    edit: "edit",
    detail: ":id",
  },
} as const)

// костыль чтобы не тратить время
export const clientRoutes = Object.freeze({
  index: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/profile",
  articles: {
    index: "/articles",
    create: "/articles/create",
    edit: (slug: string) => `/articles/${slug}/edit`,
  },
} as const)
