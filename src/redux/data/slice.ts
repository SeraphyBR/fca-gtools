import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Project } from "../../models/project"

type DataState = {
  project?: Project
}

const initialState: DataState = {
  project: undefined
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setWorkingProject: (state, action: PayloadAction<Project>) => {
      state.project = action.payload
    }
  }
})

export const dataActions = dataSlice.actions

export default dataSlice
