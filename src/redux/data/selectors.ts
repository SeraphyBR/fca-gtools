import { RootState } from "../store"

export const getWorkingProject = (state: RootState) => state.data.context
