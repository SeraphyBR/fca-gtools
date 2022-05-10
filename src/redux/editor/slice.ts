import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TriadicContextData } from "../../models/context"

type EditorState = {
  idContext?: string
  contextData?: TriadicContextData
  editMode: boolean
}

const initialState: EditorState = {
  idContext: undefined,
  contextData: undefined,
  editMode: false
}

type EditorActionPayload = {
  id?: string
  data: TriadicContextData
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setEditableContext: (state, action: PayloadAction<EditorActionPayload>) => {
      state.contextData = action.payload.data
      state.idContext = action.payload.id
      state.editMode = true
    },
    clean: () => initialState
  }
})

export const editorActions = editorSlice.actions

export default editorSlice
