import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

type DialogModalProps = {
  id?: string
  children: React.ReactNode
  title: string
  onClose: () => void
  open: boolean
}

type ActionProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
}

type DialogModalWithActionsProps = DialogModalProps & {
  showActions: boolean
  actionLeft?: ActionProps
  actionRight?: ActionProps
}

const DialogModal: React.FC<DialogModalProps | DialogModalWithActionsProps> = (props) => {
  const handleOnClose = () => {
    props.onClose()
  }

  const withActions = "showActions" in props

  return (
    <Dialog onClose={handleOnClose} open={props.open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {props.title}
        <IconButton
          onClick={handleOnClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: "16px" }}>
        {props.children}
      </DialogContent>
      {withActions && props.showActions && (
        <DialogActions sx={{ p: "16px" }}>
          {props.actionLeft && (
            <Button
              variant="outlined"
              autoFocus
              onClick={props.actionLeft.onClick}
              disabled={props.actionLeft.disabled}
              sx={{ mr: "auto" }}
            >
              {props.actionLeft.label}
            </Button>
          )}
          {props.actionRight && (
            <Button
              variant="contained"
              autoFocus
              onClick={props.actionRight.onClick}
              disabled={props.actionRight.disabled}
            >
              {props.actionRight.label}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default DialogModal
