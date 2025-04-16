import "@/index.scss"
import { ConfigProvider } from "antd"
import React from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router"
import App from "./App"
import { Provider } from "react-redux"
import { store } from "./store/redux"

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <ConfigProvider
      theme={{
        hashed: false,
        components: {
          Pagination: {
            itemActiveBg: "#1890FF",
            itemBg: "transparent",
            colorPrimary: "white",
            colorPrimaryBorder: "transparent",
          },
        },
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </HashRouter>
)
