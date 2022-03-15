import { RootState } from "../store"

export const getThemeSettings = (state: RootState) => state.settings.theme

export const getLanguageSettings = (state: RootState) => state.settings.language
