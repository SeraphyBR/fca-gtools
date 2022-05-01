import { RootState } from "../store"

export const getEditorContext = (state: RootState) => state.editor.context

export const getEditorEditMode = (state: RootState) => state.editor.editMode
