import React from "react"
import { Link } from "react-router"
import { routes } from "../../router"

type Props = {}

const SignUpPage = (props: Props) => {
  return (
    <>
      SignUpPage <Link to={routes.index}>go to index</Link>
    </>
  )
}

export default SignUpPage
