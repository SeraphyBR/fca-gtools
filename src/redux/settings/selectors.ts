import { RootState } from "../store"

export const getThemeSettingsSelector = (state: RootState) => state.settings.theme

export const getLanguageSettingsSelector = (state: RootState) => state.settings.language
