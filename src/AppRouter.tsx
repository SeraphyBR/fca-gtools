import { createTheme, ThemeProvider } from "@mui/material"
import { SnackbarProvider } from "notistack"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar"
import RulesPage from "./pages/rules/Rules"
import EditorPage from "./pages/editor/Editor"
import ContextsPage from "./pages/contexts/Contexts"
import HomePage from "./pages/home/Home"
import SettingsPage from "./pages/settings/Settings"
import { getLanguageSettingsSelector, getThemeSettingsSelector } from "./redux/settings/selectors"
import ConceptsPage from "./pages/concepts/Concepts"

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
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <Sidebar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contexts" element={<ContextsPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/concepts" element={<ConceptsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default AppRouter
