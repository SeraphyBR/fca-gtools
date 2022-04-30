import React, { useState, useRef, useEffect, useMemo, useCallback, CSSProperties } from "react"
import { AgGridReact } from "ag-grid-react"
import { ColDef, ColGroupDef } from "ag-grid-community"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"

import * as S from "./ContextDataGrid.style"

type ContextData = {
  objects: string[]
  attributes: string[]
  conditions: string[]
}

type ContextDataGridProps = {
  style?: CSSProperties
  context: ContextData
}

const autoGenMockRowData = (context: ContextData) => {
  let obj: { [k: string]: boolean } = {}
  context.conditions.forEach((condition) => {
    context.attributes.forEach((attr) => {
      obj[`${condition}_${attr}`] = false
    })
  })
  return Array(context.objects.length).fill(obj)
}

const ContextDataGrid: React.FC<ContextDataGridProps> = (props) => {
  const gridRef = useRef<AgGridReact>(null) // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(autoGenMockRowData(props.context)) // Set rowData to Array of Objects, one Object per Row

  const transformContextToColumns = (context: ContextData) => {
    const columns: (ColDef | ColGroupDef)[] = context.conditions.map((condition) => {
      return {
        headerName: condition,
        resizable: true,
        children: context.attributes.map((attr) => ({
          field: `${condition}_${attr}`,
          headerName: attr,
          resizable: true
        }))
      }
    })

    columns.unshift({ headerName: "", valueGetter: "node.rowIndex + 1", resizable: true })

    return columns
  }

  // Each Column Definition results in one Column.
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(transformContextToColumns(props.context))

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(() => {
    console.log("cellClicked")
  }, [])

  return (
    <S.StyledGrid>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={props.style}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </S.StyledGrid>
  )
}

export default ContextDataGrid
