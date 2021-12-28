import styled, { keyframes } from "styled-components"

export const AppWrapper = styled.div`
  text-align: center;
`

export const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export const AppLogo = styled.img`
  height: 20vmin;
  pointer-events: none;
`

const SpinLogoAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const AppLogoRotate = styled(AppLogo)`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${SpinLogoAnimation} infinite 20s linear;
  }
`

export const AppLink = styled.a`
  color: #61dafb;
  margin-bottom: 5vh;
`

export const InlineLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > img {
    margin-right: 3vw;
  }
`
