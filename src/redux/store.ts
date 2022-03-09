import { configureStore } from "@reduxjs/toolkit"
import settingsSlice from "./settings/slice"

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store
