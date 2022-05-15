import { Analytics, Delete, GridOn } from "@mui/icons-material"
import { Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../../../models/project"
import { fetchContexts } from "../../../redux/contexts/actions"
import { dataActions } from "../../../redux/data/slice"
import { editorActions } from "../../../redux/editor/slice"
import { useAppDispatch } from "../../../redux/store"
import { deleteContext, getContextData } from "../../../services/backend"

type ContextCardProps = {
  context: Context
}

const ContextCard: React.FC<ContextCardProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

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

  const handleOnClickDelete = () => {
    deleteContext(props.context.id).then(() => {
      dispatch(fetchContexts())
      enqueueSnackbar("Deletado com sucesso!", { variant: "success" })
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
        <IconButton color="primary" onClick={handleOnClickDelete} sx={{ ml: "auto!important" }}>
          <Tooltip arrow title="Deletar contexto">
            <Delete />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ContextCard
