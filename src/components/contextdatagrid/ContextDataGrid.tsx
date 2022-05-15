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

const transformContextToRows = (context: TriadicContextData) => {
  let rows = context.objects.map((obj) => {
    let rowData: Record<string, string | boolean> = {}

    rowData.name = obj.name

    context.conditions.forEach((condition, cidx) => {
      context.attributes.forEach((attr, aidx) => {
        rowData[`${condition}_${attr}`] = obj.relation.some((r) => r.attributeIdx === aidx && r.conditionIdx === cidx)
      })
    })

    return rowData
  })

  return rows
}

// For apply changes made in grid of the objects relations
const transformRowsToContext = (rows: Record<string, string | boolean>[], originalContext: TriadicContextData) => {
  let editedContext: TriadicContextData = JSON.parse(JSON.stringify(originalContext))

  editedContext.objects.forEach((obj, idx) => {
    let row = rows[idx]
    obj.name = row.name.toString()
    obj.relation = []

    editedContext.conditions.forEach((condition, cidx) => {
      editedContext.attributes.forEach((attr, aidx) => {
        if (row[`${condition}_${attr}`]) {
          obj.relation.push({ attributeIdx: aidx, conditionIdx: cidx })
        }
      })
    })
  })

  return editedContext
}

const transformContextToColumns = (context: TriadicContextData, editable?: boolean) => {
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
            editable,
            singleClickEdit: true,
            suppressMovable: true,
            cellRenderer: "checkboxRenderer",
            cellEditor: "checkboxEditor"
          } as ColDef)
      )
    }
  })

  columns.push({
    headerName: "",
    valueGetter: "node.rowIndex + 1",
    resizable: true,
    lockPosition: "left",
    colId: "RowIndexColumn"
  })

  return columns
}

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
