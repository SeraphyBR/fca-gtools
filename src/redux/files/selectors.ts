import { RootState } from "../store"

export const getProjectsSelector = (state: RootState) => state.files.projects
