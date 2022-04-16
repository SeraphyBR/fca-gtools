import { Button, Card, CardContent } from "@mui/material"
import React from "react"
import { Project } from "../../../models/project"
import { getTeste2 } from "../../../services/backend"

type FileCardProps = {
  project: Project
}

const FileCard: React.FC<FileCardProps> = (props) => {
  const handleOnClick = () => {
    getTeste2(props.project.id).then(() => console.log("algo"))
  }

  return (
    <Card variant="outlined" sx={{ width: 275 }}>
      <CardContent>
        <span>{props.project.name}</span>
        <Button variant="contained" onClick={handleOnClick}>
          Teste
        </Button>
      </CardContent>
    </Card>
  )
}

export default FileCard
