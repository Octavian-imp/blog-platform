export default async function fetchWithToken(
  input: string | URL | globalThis.Request,
  token: string,
  init?: RequestInit
) {
  return await fetch(input, {
    ...init,
    headers: { ...init?.headers, Authorization: `Token ${token}`, "Content-Type": "application/json" },
  })
}
