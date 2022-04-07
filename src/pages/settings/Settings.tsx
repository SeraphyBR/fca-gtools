import { DeleteForeverTwoTone } from "@mui/icons-material"
import { Button, Divider, FormControl, MenuItem, Select, Stack, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import BasePage from "../../components/basepage/BasePage"
import DeleteAllDialog from "../../dialogs/deleteAll/DeleteAll"
import { getThemeSettingsSelector } from "../../redux/settings/selectors"
import { settingsActions } from "../../redux/settings/slice"
import { useAppDispatch } from "../../redux/store"
import { deleteAllProjects } from "../../services/backend"

const Settings: React.FC = () => {
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation("translation", { keyPrefix: "pages.settings" })
  const { enqueueSnackbar } = useSnackbar()

  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false)
  const themeMode = useSelector(getThemeSettingsSelector)

  const handleOnCloseDeleteAllDialog = () => {
    setOpenDeleteAllDialog(false)
  }

  const handleDeleteAllOnClick = () => {
    setOpenDeleteAllDialog(true)
  }

  const handleOnDelete = () => {
    handleOnCloseDeleteAllDialog()

    deleteAllProjects()
      .then(() => {
        enqueueSnackbar("Deletado com sucesso", { variant: "success" })
      })
      .catch(() => {
        enqueueSnackbar("Algo de errado ocorreu ao deletar", { variant: "error" })
      })
  }

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <Stack direction="column" spacing={4} marginTop="16px">
        <FormControl>
          <Stack direction="row" spacing={4}>
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
          <Stack direction="row" spacing={4}>
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

        <Button
          variant="contained"
          startIcon={<DeleteForeverTwoTone />}
          sx={{ width: "fit-content", textTransform: "none" }}
          onClick={handleDeleteAllOnClick}
        >
          {t("buttons.deleteAll")}
        </Button>
      </Stack>
      <DeleteAllDialog open={openDeleteAllDialog} onClose={handleOnCloseDeleteAllDialog} onDelete={handleOnDelete} />
    </BasePage>
  )
}

export default Settings
