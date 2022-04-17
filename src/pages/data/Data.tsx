import { Divider, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import { getWorkingProject } from "../../redux/data/selectors"
import { getTeste2 } from "../../services/backend"

const Data: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.data" })
  const navigate = useNavigate()

  const project = useSelector(getWorkingProject)

  useEffect(() => {
    if (project === undefined) {
      navigate("/files")
    }
  }, [project, navigate])

  useEffect(() => {
    if (project !== undefined) {
      getTeste2(project.id).then(() => console.log("Requisitado api python"))
    }
  }, [project])

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + project?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <p>{project?.name}</p>
    </BasePage>
  )
}

export default Data
