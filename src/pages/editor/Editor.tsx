import { Box, Divider, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import ContextDataGrid from "../../components/datagrid/ContextDataGrid"
import { TriadicContextData } from "../../models/context"
import { getEditorContext, getEditorEditMode } from "../../redux/editor/selectors"

const Editor: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.editor" })
  const navigate = useNavigate()

  const context = useSelector(getEditorContext)
  const editMode = useSelector(getEditorEditMode)

  if (context === undefined) navigate("/files")

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + context?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />

      <Box>
        {context && <ContextDataGrid style={{ height: "80vh", width: "auto" }} context={context} editable={editMode} />}
      </Box>
    </BasePage>
  )
}

export default Editor
