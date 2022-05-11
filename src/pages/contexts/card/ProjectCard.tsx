import { Analytics, Delete, GridOn } from "@mui/icons-material"
import { Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../../models/project"
import { dataActions } from "../../../redux/data/slice"
import { editorActions } from "../../../redux/editor/slice"
import { useAppDispatch } from "../../../redux/store"
import { getContextData } from "../../../services/backend"

type ContextCardProps = {
  context: Context
}

const ContextCard: React.FC<ContextCardProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOnClickOpenData = () => {
    dispatch(dataActions.setWorkingContext(props.context))
    navigate("/data")
  }

  const handleOnClickOpenContext = () => {
    getContextData(props.context.id).then((contextData) => {
      dispatch(editorActions.setEditableContext({ id: props.context.id, data: contextData }))
      navigate("/editor")
    })
  }

  return (
    <Card variant="outlined" sx={{ width: 275 }}>
      <CardContent>
        <Typography>{props.context.name}</Typography>
        <Chip variant="outlined" color="info" size="small" sx={{ borderRadius: "4px", mt: "4px" }} label="Triadico" />
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={handleOnClickOpenContext}>
          <Tooltip arrow title="Abrir contexto">
            <GridOn />
          </Tooltip>
        </IconButton>
        <IconButton color="primary" onClick={handleOnClickOpenData}>
          <Tooltip arrow title="Extrair regras">
            <Analytics />
          </Tooltip>
        </IconButton>
        <IconButton color="primary" onClick={handleOnClickOpenData}>
          <Tooltip arrow title="Extrair conceitos">
            <Analytics />
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

export default ContextCard
