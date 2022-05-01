import { Box, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import DialogModal from "../../components/dialogmodal/DialogModal"

type NewContextDialogProps = {
  open: boolean
  onClose: () => void
  onCreateContext: (name: string, objects: number, attributes: number, conditions: number) => void
}

const NewContextDialog: React.FC<NewContextDialogProps> = (props) => {
  const inputInitialState = { name: "", objects: "", attributes: "", conditions: "" }
  const [input, setInput] = useState(inputInitialState)

  const handleOnClose = () => {
    setInput(inputInitialState)
    props.onClose()
  }

  const handleTextFieldOnChange = (field: keyof typeof input) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    const newValue = field !== "name" ? inputValue.replace(/[^0-9]/g, "").replace(/^0+/, "") : inputValue
    setInput((old) => ({ ...old, [field]: newValue }))
  }

  const handleOnCreateContext = () => {
    props.onCreateContext(input.name, Number(input.objects), Number(input.attributes), Number(input.conditions))
    handleOnClose()
  }

  const disabledActionRight = Object.values(input).some((v) => v.trim() === "")

  return (
    <DialogModal
      title="Novo contexto"
      open={props.open}
      onClose={handleOnClose}
      showActions
      actionLeft={{ label: "Cancelar", onClick: handleOnClose }}
      actionRight={{ label: "Criar contexto", onClick: handleOnCreateContext, disabled: disabledActionRight }}
    >
      <Box component="form" display="flex" gap="16px" flexDirection="column">
        <Typography mb="8px">Preencha as informações abaixo: </Typography>
        <TextField value={input.name} onChange={handleTextFieldOnChange("name")} label="Nome do contexto" />
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
