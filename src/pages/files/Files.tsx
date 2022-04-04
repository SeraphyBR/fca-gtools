import { Divider, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import BasePage from "../../components/basepage/BasePage"
import FileDrop from "../../components/filedrop/FileDrop"
import FileCard from "./card/FileCard"
import { postAddProject } from "../../services/backend"
import { useSelector } from "react-redux"
import { getProjectsSelector } from "../../redux/files/selectors"
import { useAppDispatch } from "../../redux/store"
import { fetchProjects } from "../../redux/files/actions"

const Files: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })
  const dispatch = useAppDispatch()

  const projects = useSelector(getProjectsSelector)

  const handleOnDropFile = (files: File[]) => {
    postAddProject({ name: files[0].name, filename: files[0].name, blob: files[0] }).then(() =>
      console.log("Adicionado")
    )
  }

  useEffect(() => {
    dispatch(fetchProjects)
  }, [dispatch])

  const projectCounter = projects.length.toString().padStart(2, "0")

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <FileDrop label={t("filedrop.label")} onDrop={handleOnDropFile} />
      <Divider sx={{ margin: "8px 0px" }} />
      <div>
        <Typography variant="subtitle1" mb="8px">
          {projectCounter} Projetos carregados
        </Typography>
        <Grid container spacing={2}>
          {projects.map((p) => (
            <Grid item key={p.id}>
              <FileCard project={p} key={p.id} />
            </Grid>
          ))}
        </Grid>
      </div>
    </BasePage>
  )
}

export default Files
