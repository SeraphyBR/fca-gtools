import { Button, Card, CardContent } from "@mui/material"
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
        <span>{props.project.name}</span>
        <Button variant="contained" onClick={handleOnClickOpenData}>
          Abrir detalhes
        </Button>
        <Button variant="contained" onClick={handleOnClickOpenContext}>
          Abrir contexto
        </Button>
      </CardContent>
    </Card>
  )
}

export default FileCard
