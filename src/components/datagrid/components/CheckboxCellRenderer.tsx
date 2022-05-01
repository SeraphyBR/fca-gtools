import { Checkbox } from "@mui/material"
import { ICellRendererParams } from "ag-grid-community"
import React from "react"

type CheckboxCellRendererProps = ICellRendererParams

const CheckboxCellRenderer: React.FC<CheckboxCellRendererProps> = (props) => {
  return <Checkbox checked={props.value as boolean} />
}

export default CheckboxCellRenderer
