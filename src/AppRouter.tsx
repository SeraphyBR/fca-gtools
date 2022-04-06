import { createTheme, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import Data from "./pages/data/Data"
import Files from "./pages/files/Files"
import Home from "./pages/home/Home"
import Settings from "./pages/settings/Settings"
import { getLanguageSettingsSelector, getThemeSettingsSelector } from "./redux/settings/selectors"

const AppRouter: React.FC = () => {
  const themeMode = useSelector(getThemeSettingsSelector)
  const language = useSelector(getLanguageSettingsSelector)
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
      <SnackbarProvider maxSnack={3}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
          <Route path="/data" element={<Data />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default AppRouter
