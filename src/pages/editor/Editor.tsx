import { Divider, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import BasePage from "../../components/basepage/BasePage"
import ContextDataGrid from "../../components/datagrid/ContextDataGrid"

const Editor: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.editor" })

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />

      <div>
        <ContextDataGrid
          style={{ height: "400px", width: "auto" }}
          context={{ objects: ["a", "b", "c"], attributes: ["g", "h"], conditions: ["A", "B"] }}
          editable
        />
      </div>
    </BasePage>
  )
}

export default Editor
