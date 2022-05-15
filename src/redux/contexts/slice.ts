import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Context } from "../../models/project"
import { fetchContexts } from "./actions"

type ContextsState = {
  contexts: Context[]
  recentOpenFiles: string[]
}

const initialState: ContextsState = {
  contexts: [],
  recentOpenFiles: []
}

const contextsSlice = createSlice({
  name: "contexts",
  initialState,
  reducers: {
    addRecentOpenFile: (state, action: PayloadAction<string>) => {
      state.recentOpenFiles.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContexts.fulfilled, (state, action) => {
      state.contexts = action.payload
    })
  }
})

export const contextsActions = contextsSlice.actions

export default contextsSlice
