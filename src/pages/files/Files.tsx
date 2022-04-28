import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
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
import DialogModal from "../../components/dialogmodal/DialogModal"
import { AddRounded, ArrowDownwardRounded } from "@mui/icons-material"
import { AxiosError } from "axios"
import { TaskAbortError } from "@reduxjs/toolkit"

const Files: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [openModal, setOpenModal] = useState(false)

  const projects = useSelector(getProjectsSelector)

  useEffect(() => {
    const promise = dispatch(fetchProjects())

    promise.unwrap().catch((error: AxiosError | TaskAbortError) => {
      if (error.name === "AbortError") return
      enqueueSnackbar("Ocorreu um erro ao buscar os projetos", { variant: "error" })
    })

    return () => promise.abort()
  }, [dispatch])

  const handleOnDropFile = (files: File[]) => {
    setOpenModal(false)
    postAddProject({ name: files[0].name, filename: files[0].name, blob: files[0] })
      .then(() => {
        enqueueSnackbar("Adicionado com sucesso!", { variant: "success" })
        dispatch(fetchProjects())
      })
      .catch(() => {
        enqueueSnackbar("Ocorreu um erro ao adicionar!", { variant: "error" })
      })
  }

  const projectCounter = projects.length.toString().padStart(2, "0")

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <div>
        <Box mb="24px" width="100%" height="36px" alignItems="center" display="inline-flex" gap="12px">
          <Typography variant="subtitle1">{projectCounter} Contextos adicionados</Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            startIcon={<ArrowDownwardRounded />}
            onClick={() => setOpenModal(true)}
          >
            Importar contexto
          </Button>
          <Button variant="contained" startIcon={<AddRounded />}>
            Criar novo contexto
          </Button>
        </Box>
        <Grid container spacing={2}>
          {projects.map((p) => (
            <Grid item key={p.id}>
              <FileCard project={p} key={p.id} />
            </Grid>
          ))}
        </Grid>
      </div>
      <DialogModal title="Adicione" open={openModal} onClose={() => setOpenModal(false)}>
        <Box height="320px">
          <FileDrop label={t("filedrop.label")} onDrop={handleOnDropFile} />
        </Box>
      </DialogModal>
    </BasePage>
  )
}

export default Files
