import React from "react"
import { TriadicAssociationRule } from "../../models/rule"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Box, SxProps, Theme } from "@mui/material"

type RulesDataGridProps = {
  rules: TriadicAssociationRule[]
  loading?: boolean
  sx?: SxProps<Theme>
}

const RulesDataGrid: React.FC<RulesDataGridProps> = (props) => {
  const columns: GridColDef[] = [
    {
      field: "implication",
      headerName: "Implicações",
      headerAlign: "center",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "conditions",
      headerName: "Condições",
      headerAlign: "center",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "support",
      headerName: "Suporte",
      headerAlign: "center",
      type: "number",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "confidence",
      headerName: "Confiança",
      headerAlign: "center",
      type: "number",
      align: "center",
      width: 200,
      hideable: false
    }
  ]

  const rows = props.rules.map((r, idx) => ({
    id: idx,
    implication: r.left_side.join(", ") + " -> " + r.right_side.join(", "),
    conditions: r.condition.join(", "),
    support: r.support,
    confidence: r.confidence
  }))

  return (
    <Box sx={props.sx}>
      <DataGrid rows={rows} columns={columns} loading={props.loading} disableSelectionOnClick autoPageSize />
    </Box>
  )
}

export default RulesDataGrid
