import { Button } from "@mui/material"
import React, { useState } from "react"
import BasePage from "../../components/basepage/BasePage"
import { getTeste } from "../../services/backend"
import * as S from "./Home.style"

const Home: React.FC = () => {
  const [exibirTest, setExibirTest] = useState(false)
  const [textoApi, setTextoApi] = useState("")

  const handleOnClick = () => {
    setExibirTest((v) => !v)
    getTeste().then((value) => setTextoApi(value))
  }

  return (
    <BasePage>
      <S.HomeWrapper>
        <p>teste</p>
        {exibirTest && (
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
            <br />
          </p>
        )}
        <Button onClick={handleOnClick}>teste tauri</Button>
      </S.HomeWrapper>
    </BasePage>
  )
}

export default Home
