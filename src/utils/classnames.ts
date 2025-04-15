import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export default function cn(...classes: string[]) {
  return clsx(twMerge(...classes))
}
