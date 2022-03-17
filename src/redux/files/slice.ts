import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FilesState = {
  recentOpenFiles: string[]
}

const initialState: FilesState = {
  recentOpenFiles: []
}

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addRecentOpenFile: (state, action: PayloadAction<string>) => {
      state.recentOpenFiles.push(action.payload)
    }
  }
})

export const filesActions = filesSlice.actions

export default filesSlice
