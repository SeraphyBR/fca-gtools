import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import settingsSlice from "./settings/slice"

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
