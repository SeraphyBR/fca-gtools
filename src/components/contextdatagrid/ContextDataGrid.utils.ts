import { ColDef, ColGroupDef } from "ag-grid-community"
import { TriadicContextData } from "../../models/data"

export const transformContextToRows = (context: TriadicContextData) => {
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
export const transformRowsToContext = (
  rows: Record<string, string | boolean>[],
  originalContext: TriadicContextData
) => {
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

export const transformContextToColumns = (context: TriadicContextData, editable?: boolean) => {
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
