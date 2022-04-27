import React, { useState, useRef, useEffect, useMemo, useCallback, CSSProperties } from "react"
import { AgGridReact } from "ag-grid-react"
import { ColDef, ColGroupDef } from "ag-grid-community"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"

type DataGridProps = {
  style?: CSSProperties
}

const DataGrid: React.FC<DataGridProps> = (props) => {
  const gridRef = useRef<AgGridReact>(null) // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState() // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" }
  ])

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true
    }),
    []
  )

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(() => {
    console.log("cellClicked")
  }, [])

  // Example load data from sever
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData))
  }, [])

  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={props.style}>
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  )
}

export default DataGrid
