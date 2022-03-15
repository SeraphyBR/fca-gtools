import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SettingsState = {
  theme: "light" | "dark"
  language: string
}

const initialState: SettingsState = {
  theme: "dark",
  language: "en-US"
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    }
  }
})

export const settingsActions = settingsSlice.actions

export default settingsSlice
