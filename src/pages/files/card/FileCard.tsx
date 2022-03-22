import { Accordion, AccordionSummary, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { Project } from "../../../models/project"

type FileCardProps = {
  project: Project
}

const FileCard: React.FC<FileCardProps> = (props) => {
  return (
    <Card variant="outlined" sx={{ width: 275 }}>
      <CardContent>
        <span>{props.project.name}</span>
      </CardContent>
    </Card>
  )
}

export default FileCard
