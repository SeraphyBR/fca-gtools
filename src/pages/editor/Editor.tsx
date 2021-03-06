import { SaveRounded } from "@mui/icons-material"
import { Box, Button, Divider, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { createRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import ContextDataGrid, { ContextDataGridRef } from "../../components/contextdatagrid/ContextDataGrid"
import { getEditorContextData, getEditorEditMode, getEditorIdContext } from "../../redux/editor/selectors"
import { editorActions } from "../../redux/editor/slice"
import { useAppDispatch } from "../../redux/store"
import { postContextData, updateContextData } from "../../services/backend"

const EditorPage: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.editor" })
  const { t: tn } = useTranslation("translation", { keyPrefix: "notifications" })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const contextDataGrifRef = createRef<ContextDataGridRef>()

  const idContext = useSelector(getEditorIdContext)
  const contextData = useSelector(getEditorContextData)
  const editMode = useSelector(getEditorEditMode)

  useEffect(() => {
    if (contextData === undefined) navigate("/contexts")
  }, [contextData])

  const handleOnClickCancel = () => {
    dispatch(editorActions.clean())
  }

  const handleOnClickSave = () => {
    const grid = contextDataGrifRef.current
    if (!grid) return

    let editedContext = grid.getContextWithChanges()

    enqueueSnackbar(tn("info.saving"), { variant: "info" })

    if (idContext) {
      updateContextData(idContext, editedContext)
        .then(() => {
          enqueueSnackbar(tn("success.changesSaved"), { variant: "success" })
          navigate("/contexts")
          dispatch(editorActions.clean())
        })
        .catch(() => {
          enqueueSnackbar("Não foi possivel salvar", { variant: "error" })
        })
    } else {
      postContextData(editedContext)
        .then(() => {
          enqueueSnackbar("Novo contexto criado com sucesso", { variant: "success" })
          navigate("/contexts")
          dispatch(editorActions.clean())
        })
        .catch(() => {
          enqueueSnackbar("Não foi possivel salvar", { variant: "error" })
        })
    }
  }

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      {contextData && (
        <Box>
          <Box display="inline-flex" gap="8px" mb="16px">
            <Typography>
              {t("infoLabel.contextName")} {contextData.name}
            </Typography>
            <Typography>
              {t("infoLabel.objects")} {contextData.objects.length}
            </Typography>
            <Typography>
              {t("infoLabel.attributes")} {contextData.attributes.length}
            </Typography>
            <Typography>
              {t("infoLabel.conditions")} {contextData.conditions.length}
            </Typography>
          </Box>

          <ContextDataGrid
            style={{ height: "calc(100vh - 200px)", width: "auto" }}
            context={contextData}
            editable={editMode}
            ref={contextDataGrifRef}
          />

          <Box mt="24px" width="100%" height="36px" alignItems="center" display="inline-flex" gap="12px">
            <Button variant="outlined" startIcon={<SaveRounded />} onClick={handleOnClickSave}>
              {t("buttons.saveChanges")}
            </Button>
            <Button variant="outlined" onClick={handleOnClickCancel}>
              {t("buttons.cancel")}
            </Button>
          </Box>
        </Box>
      )}
    </BasePage>
  )
}

export default EditorPage
