import React, { useState, useRef, useCallback, CSSProperties, useImperativeHandle } from "react"
import { AgGridReact } from "ag-grid-react"
import { ColDef, ColGroupDef, FirstDataRenderedEvent } from "ag-grid-community"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css"

import * as S from "./ContextDataGrid.style"
import CheckboxCellRenderer, { CheckboxCellEditor } from "./components/CheckboxCell"
import { useSelector } from "react-redux"
import { getThemeSettingsSelector } from "../../redux/settings/selectors"
import { TriadicContextData } from "../../models/data"
import { transformContextToColumns, transformContextToRows, transformRowsToContext } from "./ContextDataGrid.utils"

type ContextDataGridProps = {
  style?: CSSProperties
  context: TriadicContextData
  editable?: boolean
}

export type ContextDataGridRef = {
  getRowDataObject: () => Record<string, string | boolean>[]
  getContextWithChanges: () => TriadicContextData
}

const ContextDataGrid = React.forwardRef<ContextDataGridRef, ContextDataGridProps>((props, ref) => {
  const gridRef = useRef<AgGridReact>(null) // Optional - for accessing Grid's API
  // Each Column Definition results in one Column.
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(transformContextToColumns(props.context, props.editable))
  // Set rowData to Array of Objects, one Object per Row
  const rowDataRef = useRef(transformContextToRows(props.context))

  const themeMode = useSelector(getThemeSettingsSelector)

  useImperativeHandle(ref, () => ({
    getRowDataObject: () => rowDataRef.current,
    getContextWithChanges: () => transformRowsToContext(rowDataRef.current, props.context)
  }))

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
          rowData={rowDataRef.current} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
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
})

export default ContextDataGrid
