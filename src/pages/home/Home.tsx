import React, { useState } from "react"
import logo from "../../assets/logo.svg"
import tauriCircles from "../../assets/tauri.svg"
import tauriWord from "../../assets/wordmark.svg"
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
    <S.AppWrapper>
      <S.AppHeader>
        <S.InlineLogo>
          <S.AppLogoRotate src={tauriCircles} alt="logo" />
          <S.AppLogo src={tauriWord} alt="logo" style={{ height: "10vh" }} />
        </S.InlineLogo>
        <S.AppLink href="https://tauri.studio" target="_blank" rel="noopener noreferrer">
          Learn Tauri
        </S.AppLink>
        <S.AppLogoRotate src={logo} alt="logo" />
        <S.AppLink href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </S.AppLink>
        {exibirTest && (
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
            <br />
            {textoApi}
          </p>
        )}
        <button onClick={handleOnClick}>teste tauri</button>
      </S.AppHeader>
    </S.AppWrapper>
  )
}

export default Home
