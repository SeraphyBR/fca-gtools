import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project } from "../../models/project"
import { fetchProjects } from "./actions"

type FilesState = {
  projects: Project[]
  recentOpenFiles: string[]
}

const initialState: FilesState = {
  projects: [],
  recentOpenFiles: []
}

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addRecentOpenFile: (state, action: PayloadAction<string>) => {
      state.recentOpenFiles.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = action.payload
    })
  }
})

export const filesActions = filesSlice.actions

export default filesSlice
