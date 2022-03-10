import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type SettingsState = {
  theme: "light" | "dark"
}

const initialState: SettingsState = {
  theme: "dark"
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
    }
  }
})

export const settingsActions = settingsSlice.actions

export default settingsSlice
