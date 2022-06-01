import React from "react"
import { TriadicAssociationRule } from "../../models/rule"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton
} from "@mui/x-data-grid"
import { Box, SxProps, Theme } from "@mui/material"
import { useTranslation } from "react-i18next"

type RulesDataGridProps = {
  rules: TriadicAssociationRule[]
  type: string
  loading?: boolean
  sx?: SxProps<Theme>
}

const RulesDataGrid: React.FC<RulesDataGridProps> = (props) => {
  const { t } = useTranslation("translation", { keyPrefix: "components.rulesDataGrid" })

  const columns: GridColDef[] = [
    {
      field: "implication",
      headerName: t("columns.implication"),
      headerAlign: "center",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "conditions",
      headerName: props.type === "bcaars" ? t("columns.conditions") : t("columns.attributes"),
      headerAlign: "center",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "support",
      headerName: t("columns.support"),
      headerAlign: "center",
      type: "number",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "confidence",
      headerName: t("columns.confidence"),
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

  const DataGridToolbar: React.FC = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarDensitySelector />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    )
  }

  return (
    <Box sx={props.sx}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={props.loading}
        components={{ Toolbar: DataGridToolbar }}
        disableSelectionOnClick
        autoPageSize
      />
    </Box>
  )
}

export default RulesDataGrid
