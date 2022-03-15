import { createTheme, ThemeProvider } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import Files from "./pages/files/Files"
import Home from "./pages/home/Home"
import Settings from "./pages/settings/Settings"
import { getLanguageSettings, getThemeSettings } from "./redux/settings/selectors"

const App: React.FC = () => {
  const themeMode = useSelector(getThemeSettings)
  const language = useSelector(getLanguageSettings)
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

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
        <Route path="/files" element={<Files />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
