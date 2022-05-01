import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TriadicContextData } from "../../models/context"

type EditorState = {
  context?: TriadicContextData
  editMode: boolean
}

const initialState: EditorState = {
  context: undefined,
  editMode: false
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditableContext: (state, action: PayloadAction<TriadicContextData>) => {
      state.context = action.payload
      state.editMode = true
    }
  }
})

export const editorActions = editorSlice.actions

export default editorSlice
