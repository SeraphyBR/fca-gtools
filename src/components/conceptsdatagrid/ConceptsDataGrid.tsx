import React from "react"
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid"
import { Box, SxProps, Theme } from "@mui/material"
import { TriadicConcept } from "../../models/concept"

type ConceptsDataGridProps = {
  concepts: TriadicConcept[]
  loading?: boolean
  sx?: SxProps<Theme>
}

const ConceptsDataGrid: React.FC<ConceptsDataGridProps> = (props) => {
  const columns: GridColDef[] = [
    {
      field: "objects",
      headerName: "Objetos",
      headerAlign: "center",
      align: "center",
      width: 200,
      hideable: false
    },
    {
      field: "attrs",
      headerName: "Atributos",
      headerAlign: "center",
      type: "number",
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
    }
  ]

  const rows = props.concepts.map((c, idx) => ({
    id: idx,
    objects: c.objects.join(", "),
    attrs: c.attrs.join(", "),
    conditions: c.conditions.join(", ")
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

export default ConceptsDataGrid
