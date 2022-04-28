import { Paper } from "@mui/material"
import React from "react"
import Sidebar from "../sidebar/Sidebar"

type BasePageProps = {
  children: React.ReactNode
}

const BasePage: React.FC<BasePageProps> = (props) => {
  return (
    <Paper
      elevation={0}
      square
      sx={{ height: "calc(100vh - 32px)", padding: "16px", marginLeft: "56px", overflow: "auto" }}
    >
      {props.children}
    </Paper>
  )
}

export default BasePage
