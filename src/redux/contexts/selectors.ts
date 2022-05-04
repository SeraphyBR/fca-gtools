import { RootState } from "../store"

export const getContextsSelector = (state: RootState) => state.contexts.contexts
