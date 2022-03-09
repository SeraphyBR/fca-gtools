import React from "react"
import Sidebar from "../sidebar/Sidebar"

const BasePage: React.FC = (props) => {
  return (
    <div>
      <Sidebar />
      {props.children}
    </div>
  )
}

export default BasePage
