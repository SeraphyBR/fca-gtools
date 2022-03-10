import { createTheme, ThemeProvider } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Settings from "./pages/settings/Settings"
import { getThemeSettings } from "./redux/settings/selectors"

const App: React.FC = () => {
  const themeMode = useSelector(getThemeSettings)

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode
        }
      }),
    [themeMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
