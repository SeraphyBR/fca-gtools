import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"
import { Box, Checkbox } from "@mui/material"
import { ICellEditorParams, ICellRendererParams } from "ag-grid-community"
import React, { useEffect, useImperativeHandle, useRef, useState } from "react"

type CheckboxCellRendererProps = ICellRendererParams

type CheckboxCellEditorProps = ICellEditorParams

export const CheckboxCellRenderer: React.FC<CheckboxCellRendererProps> = (props) => {
  const checked = props.value as boolean

  return (
    <Box display="inline-flex" height="100%" width="100%" justifyContent="center" alignItems="center">
      {checked ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />}
    </Box>
  )
}

export const CheckboxCellEditor = React.forwardRef<unknown, CheckboxCellEditorProps>((props, ref) => {
  const [checked, setChecked] = useState(props.value as boolean)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  useImperativeHandle(ref, () => ({
    getValue: () => checked
  }))

  return (
    <Box display="inline-flex" width="100%" justifyContent="center">
      <Checkbox checked={checked} onChange={handleOnChange} inputRef={inputRef} />
    </Box>
  )
})

export default CheckboxCellRenderer
