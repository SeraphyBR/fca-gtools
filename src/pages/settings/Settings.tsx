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
  const { t, i18n } = useTranslation("translation", { keyPrefix: "pages.settings" })

  const themeMode = useSelector(getThemeSettings)

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Stack direction={"column"} spacing={4} marginTop="16px">
        <FormControl>
          <Stack direction={"row"} spacing={4}>
            <p>{t("options.appearance.label")}</p>
            <Select
              value={themeMode}
              onChange={(event) => dispatch(settingsActions.setTheme(event.target.value as "light" | "dark"))}
              sx={{ marginLeft: "auto" }}
            >
              <MenuItem value="dark">{t("options.appearance.values.dark")}</MenuItem>
              <MenuItem value="light">{t("options.appearance.values.light")}</MenuItem>
            </Select>
          </Stack>
        </FormControl>

        <FormControl>
          <Stack direction={"row"} spacing={4}>
            <p>{t("options.language")}</p>
            <Select
              value={i18n.language}
              onChange={(event) => dispatch(settingsActions.setLanguage(event.target.value))}
            >
              <MenuItem value="en-US">en-US</MenuItem>
              <MenuItem value="pt-BR">pt-BR</MenuItem>
            </Select>
          </Stack>
        </FormControl>
      </Stack>
    </BasePage>
  )
}

export default Settings
