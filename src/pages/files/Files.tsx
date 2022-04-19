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
import { useSnackbar } from "notistack"

const Files: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const projects = useSelector(getProjectsSelector)

  useEffect(() => {
    const promise = dispatch(fetchProjects())

    promise.unwrap().catch(() => {
      enqueueSnackbar("Ocorreu um erro ao buscar os projetos", { variant: "error" })
    })

    return () => promise.abort()
  }, [dispatch])

  const handleOnDropFile = (files: File[]) => {
    postAddProject({ name: files[0].name, filename: files[0].name, blob: files[0] }).then(() => {
      enqueueSnackbar("Adicionado com sucesso!", { variant: "success" })
      dispatch(fetchProjects())
    })
  }

  const projectCounter = projects.length.toString().padStart(2, "0")

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <FileDrop label={t("filedrop.label")} onDrop={handleOnDropFile} />
      <Divider sx={{ margin: "8px 0px" }} />
      <div>
        <Typography variant="subtitle1" mb="8px">
          {projectCounter} Projetos
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
