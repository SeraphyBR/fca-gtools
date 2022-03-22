import { Divider, Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import BasePage from "../../components/basepage/BasePage"
import FileDrop from "../../components/filedrop/FileDrop"
import { Project } from "../../models/project"
import FileCard from "./card/FileCard"
import { v4 as uuidv4 } from "uuid"

const Files: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.files" })

  const [projects, setProjects] = useState<Project[]>([])

  const handleOnDropFile = (files: File[]) => {
    const newProjects: Project[] = files.map((file) => ({
      id: uuidv4(),
      name: file.name
    }))
    setProjects((p) => [...p, ...newProjects])
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
