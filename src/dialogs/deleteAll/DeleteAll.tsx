import React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

type DeleteAllDialogProps = {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

const DeleteAllDialog: React.FC<DeleteAllDialogProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>{"Tem certeza que deseja apagar todos os dados?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Isso inclui todos os projetos adicionados</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancelar</Button>
        <Button onClick={props.onDelete} autoFocus>
          Apagar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAllDialog
