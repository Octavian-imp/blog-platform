import "@/index.scss"
import { ConfigProvider } from "antd"
import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        hashed: false,
      }}
    >
      <App />
    </ConfigProvider>
  </BrowserRouter>
)
