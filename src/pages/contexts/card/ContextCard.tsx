import { Analytics, Assessment, Delete, FileDownload, GridOn } from "@mui/icons-material"
import { Card, CardActions, CardContent, CardHeader, Chip, IconButton, Tooltip, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import IconMenu, { IconMenuItem } from "../../../components/iconmenu/IconMenu"
import { Context } from "../../../models/context"
import { fetchContexts } from "../../../redux/contexts/actions"
import { rulesActions } from "../../../redux/rules/slice"
import { editorActions } from "../../../redux/editor/slice"
import { useAppDispatch } from "../../../redux/store"
import { deleteContext, getContextData } from "../../../services/backend"
import { conceptsActions } from "../../../redux/concepts/slice"

type ContextCardProps = {
  context: Context
}

const ContextCard: React.FC<ContextCardProps> = (props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [displayIconMenu, setDisplayIconMenu] = useState(false)

  const handleOnClickOpenRules = () => {
    dispatch(rulesActions.setWorkingContext(props.context))
    navigate("/rules")
  }

  const handleOnClickOpenContext = () => {
    getContextData(props.context.id).then((contextData) => {
      dispatch(editorActions.setEditableContext({ id: props.context.id, data: contextData }))
      navigate("/editor")
    })
  }

  const handleOnClickOpenConcepts = () => {
    dispatch(conceptsActions.setWorkingContext(props.context))
    navigate("/concepts")
  }

  const handleOnClickDelete = () => {
    deleteContext(props.context.id).then(() => {
      dispatch(fetchContexts())
      enqueueSnackbar("Deletado com sucesso!", { variant: "success" })
    })
  }

  const menuItems: IconMenuItem[] = [
    {
      label: "Fazer download",
      icon: <FileDownload fontSize="small" />
    },
    {
      label: "Remover",
      action: handleOnClickDelete,
      icon: <Delete fontSize="small" />
    }
  ]

  return (
    <Card
      variant="outlined"
      sx={{ width: 275 }}
      onMouseEnter={() => setDisplayIconMenu(true)}
      onMouseLeave={() => setDisplayIconMenu(false)}
    >
      <CardHeader
        title={
          <Typography textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" maxWidth="200px">
            {props.context.name}
          </Typography>
        }
        subheader={
          <Chip variant="outlined" color="info" size="small" sx={{ borderRadius: "4px", mt: "4px" }} label="Triadico" />
        }
        action={displayIconMenu && <IconMenu items={menuItems} />}
        disableTypography
      />
      <CardActions>
        <IconButton color="primary" onClick={handleOnClickOpenContext}>
          <Tooltip arrow title="Abrir contexto">
            <GridOn />
          </Tooltip>
        </IconButton>
        <IconButton color="primary" onClick={handleOnClickOpenRules}>
          <Tooltip arrow title="Extrair regras">
            <Analytics />
          </Tooltip>
        </IconButton>
        <IconButton color="primary" onClick={handleOnClickOpenConcepts}>
          <Tooltip arrow title="Obter conceitos">
            <Assessment />
          </Tooltip>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default ContextCard
