import { SaveRounded, SaveTwoTone } from "@mui/icons-material"
import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import ContextDataGrid from "../../components/datagrid/ContextDataGrid"
import { TriadicContextData } from "../../models/context"
import { getEditorContext, getEditorEditMode } from "../../redux/editor/selectors"
import { editorActions } from "../../redux/editor/slice"
import { useAppDispatch } from "../../redux/store"

const Editor: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.editor" })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const context = useSelector(getEditorContext)
  const editMode = useSelector(getEditorEditMode)

  useEffect(() => {
    if (context === undefined) navigate("/files")
  }, [context])

  const handleOnClickCancel = () => {
    dispatch(editorActions.clean())
  }

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      {context && (
        <Box>
          <Box display="inline-flex" gap="8px" mb="16px">
            <Typography>Contexto: {context.name}</Typography>
            <Typography>Objetos: {context.objects.length}</Typography>
            <Typography>Atributos: {context.attributes.length}</Typography>
            <Typography>Condições: {context.conditions.length}</Typography>
          </Box>

          <ContextDataGrid
            style={{ height: "calc(100vh - 200px)", width: "auto" }}
            context={context}
            editable={editMode}
          />

          <Box mt="24px" width="100%" height="36px" alignItems="center" display="inline-flex" gap="12px">
            <Button variant="outlined" startIcon={<SaveRounded />}>
              Salvar contexto
            </Button>
            <Button variant="outlined" onClick={handleOnClickCancel}>
              Cancelar
            </Button>
          </Box>
        </Box>
      )}
    </BasePage>
  )
}

export default Editor
