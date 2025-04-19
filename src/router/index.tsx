export const router = Object.freeze({
  index: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/profile",
  articles: {
    index: "articles",
    create: "new-article",
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
    create: "/articles/new-article",
    edit: (slug: string) => `/articles/${slug}/edit`,
    detail: (slug: string) => `/articles/${slug}`,
  },
} as const)
