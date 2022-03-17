import { Divider, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import BasePage from "../../components/basepage/BasePage"
import FileDrop from "../../components/filedrop/FileDrop"

const Files: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <FileDrop label={t("filedrop.label")} />
      <p>Arquivos suportados</p>
    </BasePage>
  )
}

export default Files
