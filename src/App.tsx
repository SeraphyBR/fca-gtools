import React from 'react'
import logo from './logo.svg'
import tauriCircles from './tauri.svg'
import tauriWord from './wordmark.svg'
import { AppHeader, AppLink, AppLogo, AppLogoRotate, AppWrapper, InlineLogo } from './App.style'

const App: React.FC = () => {
  return (
    <AppWrapper>
      <AppHeader>
        <InlineLogo>
          <AppLogoRotate src={tauriCircles} alt="logo" />
          <AppLogo src={tauriWord} alt="logo" style={{height: '10vh'}} />
        </InlineLogo>
        <AppLink
          href="https://tauri.studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Tauri
        </AppLink>
        <AppLogoRotate src={logo} alt="logo" />
        <AppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </AppLink>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </AppHeader>
    </AppWrapper>
  )
}

export default App
