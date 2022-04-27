import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}))

type DialogModalProps = {
  id?: string
  children: React.ReactNode
  title: string
  onClose: () => void
  open: boolean
  showActions?: boolean
}

const DialogModal: React.FC<DialogModalProps> = (props) => {
  const handleOnClose = () => {
    props.onClose()
  }

  return (
    <StyledDialog onClose={handleOnClose} open={props.open} maxWidth="md" fullWidth>
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
      <DialogContent dividers>{props.children}</DialogContent>
      {props.showActions && (
        <DialogActions>
          <Button autoFocus onClick={handleOnClose}>
            Save changes
          </Button>
        </DialogActions>
      )}
    </StyledDialog>
  )
}

export default DialogModal
