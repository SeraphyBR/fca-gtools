import { Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import BasePage from "../../components/basepage/BasePage"

const Files: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
    </BasePage>
  )
}

export default Files
