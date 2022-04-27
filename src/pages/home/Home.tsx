import React, { useState } from "react"
import BasePage from "../../components/basepage/BasePage"
import ContextDataGrid from "../../components/contextdatagrid/ContextDataGrid"
import DataGrid from "../../components/datagrid/DataGrid"
import Flow from "../../components/flow/Flow"
import * as S from "./Home.style"

const Home: React.FC = () => {
  return (
    <BasePage>
      <S.HomeWrapper>
        <p>teste</p>
        <div>
          <DataGrid style={{ height: "400px", width: "600px" }} />
        </div>
      </S.HomeWrapper>
    </BasePage>
  )
}

export default Home
