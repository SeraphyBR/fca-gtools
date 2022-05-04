import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import BasePage from "../../components/basepage/BasePage"
import FileDrop from "../../components/filedrop/FileDrop"
import ProjectCard from "./card/ProjectCard"
import { postAddProject } from "../../services/backend"
import { useSelector } from "react-redux"
import { getContextsSelector } from "../../redux/contexts/selectors"
import { useAppDispatch } from "../../redux/store"
import { fetchProjects } from "../../redux/contexts/actions"
import { useSnackbar } from "notistack"
import DialogModal from "../../components/dialogmodal/DialogModal"
import { AddRounded, ArrowDownwardRounded } from "@mui/icons-material"
import { AxiosError } from "axios"
import { TaskAbortError } from "@reduxjs/toolkit"
import NewContextDialog from "../../dialogs/newContext/NewContext"
import { TriadicContextData, TriadicObjectData } from "../../models/context"
import { editorActions } from "../../redux/editor/slice"
import { useNavigate } from "react-router-dom"

const ContextsPage: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [openFileModal, setOpenFileModal] = useState(false)
  const [openNewContextDialog, setOpenNewContextDialog] = useState(false)

  const contexts = useSelector(getContextsSelector)

  useEffect(() => {
    const promise = dispatch(fetchProjects())

    promise.unwrap().catch((error: AxiosError | TaskAbortError) => {
      if (error.name === "AbortError") return
      enqueueSnackbar("Ocorreu um erro ao buscar os projetos", { variant: "error" })
    })

    return () => promise.abort()
  }, [dispatch])

  const handleOnDropFile = (files: File[]) => {
    setOpenFileModal(false)
    postAddProject({ name: files[0].name, filename: files[0].name, blob: files[0] })
      .then(() => {
        enqueueSnackbar("Adicionado com sucesso!", { variant: "success" })
        dispatch(fetchProjects())
      })
      .catch(() => {
        enqueueSnackbar("Ocorreu um erro ao adicionar!", { variant: "error" })
      })
  }

  const handleOnCreateContext = (name: string, objects: number, attributes: number, conditions: number) => {
    let newContext: TriadicContextData = {
      name,
      attributes: Array.from(Array(attributes)).map((_, i) => {
        const alpha = i + "A".charCodeAt(0)
        return String.fromCharCode(alpha).toLowerCase()
      }),
      conditions: Array.from(Array(conditions)).map((_, i) => {
        const alpha = i + "A".charCodeAt(0)
        return String.fromCharCode(alpha).toUpperCase()
      }),
      objects: Array.from(Array(objects)).map((_, i) => ({ name: i.toString(), relation: [] } as TriadicObjectData))
    }
    dispatch(editorActions.setEditableContext(newContext))
    navigate("/editor")
  }

  const contextCounter = contexts.length.toString().padStart(2, "0")

  return (
    <BasePage>
      <Typography variant="h4">{t("title")}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <Box>
        <Box mb="24px" width="100%" height="36px" alignItems="center" display="inline-flex" gap="12px">
          <Typography variant="subtitle1">{contextCounter} Contextos adicionados</Typography>
          <Button
            variant="contained"
            sx={{ ml: "auto" }}
            startIcon={<ArrowDownwardRounded />}
            onClick={() => setOpenFileModal(true)}
          >
            Importar contexto
          </Button>
          <Button variant="contained" startIcon={<AddRounded />} onClick={() => setOpenNewContextDialog(true)}>
            Criar novo contexto
          </Button>
        </Box>
        <Grid container spacing={2}>
          {contexts.map((p) => (
            <Grid item key={p.id}>
              <ProjectCard project={p} key={p.id} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <NewContextDialog
        open={openNewContextDialog}
        onCreateContext={handleOnCreateContext}
        onClose={() => setOpenNewContextDialog(false)}
      />
      <DialogModal title="Adicione" open={openFileModal} onClose={() => setOpenFileModal(false)}>
        <Box height="320px">
          <FileDrop label={t("filedrop.label")} onDrop={handleOnDropFile} />
        </Box>
      </DialogModal>
    </BasePage>
  )
}

export default ContextsPage
