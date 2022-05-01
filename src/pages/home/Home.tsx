import React, { useState } from "react"
import BasePage from "../../components/basepage/BasePage"
import ContextDataGrid from "../../components/datagrid/ContextDataGrid"
import * as S from "./Home.style"

const Home: React.FC = () => {
  return (
    <BasePage>
      <S.HomeWrapper>
        <p>teste</p>
        <div>
          <ContextDataGrid
            style={{ height: "400px", width: "auto" }}
            context={{ objects: ["a", "b", "c"], attributes: ["g", "h"], conditions: ["A", "B"] }}
          />
        </div>
      </S.HomeWrapper>
    </BasePage>
  )
}

export default Home
