import { RootState } from "../store"

export const getWorkingContext = (state: RootState) => state.data.context
