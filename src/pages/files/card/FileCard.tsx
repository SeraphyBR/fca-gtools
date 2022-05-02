import { Analytics, Delete, Edit, GridOn } from "@mui/icons-material"
import { Badge, Button, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Project } from "../../../models/project"
import { dataActions } from "../../../redux/data/slice"
import { editorActions } from "../../../redux/editor/slice"
import { useAppDispatch } from "../../../redux/store"
import { getContextData } from "../../../services/backend"

type FileCardProps = {
  project: Project
}

const FileCard: React.FC<FileCardProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOnClickOpenData = () => {
    dispatch(dataActions.setWorkingProject(props.project))
    navigate("/data")
  }

  const handleOnClickOpenContext = () => {
    getContextData(props.project.id).then((context) => {
      dispatch(editorActions.setEditableContext(context))
      navigate("/editor")
    })
  }

  return (
    <Card variant="outlined" sx={{ width: 275 }}>
      <CardContent>
        <Typography>{props.project.name}</Typography>
        <Chip variant="outlined" color="info" size="small" sx={{ borderRadius: "4px", mt: "4px" }} label="Triadico" />
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={handleOnClickOpenData}>
          <Tooltip arrow title="Visualizar dados">
            <Analytics />
          </Tooltip>
        </IconButton>
        <IconButton color="primary" onClick={handleOnClickOpenContext}>
          <Tooltip arrow title="Abrir no editor de contexto">
            <GridOn />
          </Tooltip>
        </IconButton>
        <IconButton color="primary" sx={{ ml: "auto!important" }}>
          <Tooltip arrow title="Deletar contexto">
            <Delete />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default FileCard
