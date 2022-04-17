import React, { useState } from "react"
import BasePage from "../../components/basepage/BasePage"
import Flow from "../../components/flow/Flow"
import * as S from "./Home.style"

const Home: React.FC = () => {
  return (
    <BasePage>
      <S.HomeWrapper>
        <p>teste</p>
        <div style={{ width: "auto", height: "500px" }}>
          <Flow />
        </div>
      </S.HomeWrapper>
    </BasePage>
  )
}

export default Home
