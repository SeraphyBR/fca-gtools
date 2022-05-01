import React, { useState, useRef, useCallback, CSSProperties } from "react"
import { AgGridReact } from "ag-grid-react"
import { ColDef, ColGroupDef, FirstDataRenderedEvent } from "ag-grid-community"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"

import * as S from "./ContextDataGrid.style"
import CheckboxCellRenderer, { CheckboxCellEditor } from "./components/CheckboxCell"
import { useSelector } from "react-redux"
import { getThemeSettingsSelector } from "../../redux/settings/selectors"
import { TriadicContextData } from "../../models/context"

type ContextDataGridProps = {
  style?: CSSProperties
  context: TriadicContextData
  editable?: boolean
}

const transformContextToRows = (context: TriadicContextData) => {
  let rows = context.objects.map((obj) => {
    let rowData: Record<string, any> = {}

    rowData.name = obj.name

    context.conditions.forEach((condition, cidx) => {
      context.attributes.forEach((attr, aidx) => {
        rowData[`${condition}_${attr}`] = obj.relation.some((r) => {
          r.attributeIdx === aidx && r.conditionIdx === cidx
        })
      })
    })

    return rowData
  })

  return rows
}

const ContextDataGrid: React.FC<ContextDataGridProps> = (props) => {
  const gridRef = useRef<AgGridReact>(null) // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(transformContextToRows(props.context)) // Set rowData to Array of Objects, one Object per Row

  const themeMode = useSelector(getThemeSettingsSelector)

  const transformContextToColumns = (context: TriadicContextData) => {
    const columns: (ColDef | ColGroupDef)[] = context.conditions.map((condition) => {
      return {
        headerName: condition,
        resizable: true,
        children: context.attributes.map(
          (attr) =>
            ({
              field: `${condition}_${attr}`,
              headerName: attr,
              resizable: true,
              editable: props.editable,
              singleClickEdit: true,
              cellRenderer: "checkboxRenderer",
              cellEditor: "checkboxEditor"
            } as ColDef)
        )
      }
    })

    columns.unshift({ headerName: "", valueGetter: "node.rowIndex + 1", resizable: true, colId: "RowIndexColumn" })

    return columns
  }

  // Each Column Definition results in one Column.
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(transformContextToColumns(props.context))

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(() => {
    console.log("cellClicked")
  }, [])

  const handleOnFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current?.columnApi.autoSizeColumn("RowIndexColumn")
  }, [])

  const gridTheme = themeMode === "dark" ? "ag-theme-alpine-dark" : "ag-theme-alpine"

  return (
    <S.StyledGrid>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className={gridTheme} style={props.style}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          onCellClicked={cellClickedListener}
          onFirstDataRendered={handleOnFirstDataRendered}
          stopEditingWhenCellsLoseFocus={true}
          pagination={true}
          paginationAutoPageSize={true}
          components={{
            checkboxRenderer: CheckboxCellRenderer,
            checkboxEditor: CheckboxCellEditor
          }}
        />
      </div>
    </S.StyledGrid>
  )
}

export default ContextDataGrid
