import { Box, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import DialogModal from "../../components/dialogmodal/DialogModal"

type NewContextDialogProps = {
  open: boolean
  onClose: () => void
  onCreateContext: (name: string, objects: number, attributes: number, conditions: number) => void
}

const NewContextDialog: React.FC<NewContextDialogProps> = (props) => {
  const { t } = useTranslation("translation", { keyPrefix: "dialogs.newContext" })
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
      title={t("title")}
      open={props.open}
      onClose={handleOnClose}
      showActions
      actionLeft={{ label: t("actions.cancel"), onClick: handleOnClose }}
      actionRight={{ label: t("actions.create"), onClick: handleOnCreateContext, disabled: disabledActionRight }}
    >
      <Box component="form" display="flex" gap="16px" flexDirection="column">
        <Typography mb="8px">{t("subtitle")}</Typography>
        <TextField value={input.name} onChange={handleTextFieldOnChange("name")} label={t("labels.name")} />
        <TextField
          value={input.objects}
          onChange={handleTextFieldOnChange("objects")}
          label={t("labels.objects")}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          value={input.attributes}
          onChange={handleTextFieldOnChange("attributes")}
          label={t("labels.attributes")}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <TextField
          value={input.conditions}
          onChange={handleTextFieldOnChange("conditions")}
          label={t("labels.conditions")}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Box>
    </DialogModal>
  )
}

export default NewContextDialog
