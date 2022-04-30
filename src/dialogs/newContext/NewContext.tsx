import { Box, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import DialogModal from "../../components/dialogmodal/DialogModal"

type NewContextDialogProps = {
  open: boolean
  onClose: () => void
}

const NewContextDialog: React.FC<NewContextDialogProps> = (props) => {
  const inputInitialState = { objects: "", attributes: "", conditions: "" }
  const [input, setInput] = useState(inputInitialState)

  const handleOnClose = () => {
    setInput(inputInitialState)
    props.onClose()
  }

  const handleTextFieldOnChange = (field: keyof typeof input) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, "").replace(/^0+/, "")
    setInput((old) => ({ ...old, [field]: newValue }))
  }

  const disableActionRight = Object.values(input).some((v) => v === "")

  return (
    <DialogModal
      title="Novo contexto"
      open={props.open}
      onClose={handleOnClose}
      showActions
      actionLeft={{ label: "Cancelar", onClick: handleOnClose }}
      actionRight={{ label: "Criar contexto", disabled: disableActionRight }}
    >
      <Box component="form" display="flex" gap="16px" flexDirection="column">
        <Typography mb="8px">Preencha as informações abaixo: </Typography>
        <TextField
          value={input.objects}
          onChange={handleTextFieldOnChange("objects")}
          label="Número de objetos"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          value={input.attributes}
          onChange={handleTextFieldOnChange("attributes")}
          label="Número de atributos"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          value={input.conditions}
          onChange={handleTextFieldOnChange("conditions")}
          label="Número de condições"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Box>
    </DialogModal>
  )
}

export default NewContextDialog
