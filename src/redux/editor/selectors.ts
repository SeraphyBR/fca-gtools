import { RootState } from "../store"

export const getEditorContextData = (state: RootState) => state.editor.contextData

export const getEditorIdContext = (state: RootState) => state.editor.idContext

export const getEditorEditMode = (state: RootState) => state.editor.editMode
