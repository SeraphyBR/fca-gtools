import { Button, Card, CardContent } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Project } from "../../../models/project"
import { dataActions } from "../../../redux/data/slice"
import { useAppDispatch } from "../../../redux/store"

type FileCardProps = {
  project: Project
}

const FileCard: React.FC<FileCardProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOnClick = () => {
    dispatch(dataActions.setWorkingProject(props.project))
    navigate("/data")
  }

  return (
    <Card variant="outlined" sx={{ width: 275 }}>
      <CardContent>
        <span>{props.project.name}</span>
        <Button variant="contained" onClick={handleOnClick}>
          Abrir detalhes
        </Button>
      </CardContent>
    </Card>
  )
}

export default FileCard
