import { Divider, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import { getWorkingProject } from "../../redux/data/selectors"

const Data: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.data" })
  const navigate = useNavigate()

  const project = useSelector(getWorkingProject)

  if (project === undefined) {
    navigate("/files")
  }

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
    </BasePage>
  )
}

export default Data
