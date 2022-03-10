import { FormControl, MenuItem, Select, Stack, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import BasePage from "../../components/basepage/BasePage"
import { getThemeSettings } from "../../redux/settings/selectors"
import { settingsActions } from "../../redux/settings/slice"
import { useAppDispatch } from "../../redux/store"

const Settings: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()

  const themeMode = useSelector(getThemeSettings)

  return (
    <BasePage>
      <div>
        <Typography variant="h4">{t("settings.title")}</Typography>
        <FormControl sx={{ marginTop: "8px" }}>
          <Stack direction={"column"} spacing={4}>
            <Stack direction={"row"} spacing={4}>
              <p>{t("settings.options.appearance")}</p>
              <Select
                value={themeMode}
                onChange={(event) => dispatch(settingsActions.setTheme(event.target.value as "light" | "dark"))}
              >
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="light">Light</MenuItem>
              </Select>
            </Stack>
            <Stack direction={"row"} spacing={4}>
              <p>{t("settings.options.language")}</p>
              <Select value={i18n.language} onChange={(event) => i18n.changeLanguage(event.target.value)}>
                <MenuItem value="en-US">en-US</MenuItem>
                <MenuItem value="pt-BR">pt-BR</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </FormControl>
      </div>
    </BasePage>
  )
}

export default Settings
