import React from "react"
import logo from "../../assets/logo.svg"
import tauriCircles from "../../assets/tauri.svg"
import tauriWord from "../../assets/wordmark.svg"
import * as S from "./Home.style"

const Home: React.FC = () => {
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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </S.AppHeader>
    </S.AppWrapper>
  )
}

export default Home
