import { useAppSelector } from "@/store/redux"
import { selectToken } from "@/store/slices/Users"

export default function useIsAuth() {
  const user = useAppSelector(selectToken)
  return !!user
}
