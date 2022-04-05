import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "redux-persist/lib/storage"
import dataSlice from "./data/slice"
import filesSlice from "./files/slice"
import settingsSlice from "./settings/slice"

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["settings"]
  },
  combineReducers({
    settings: settingsSlice.reducer,
    files: filesSlice.reducer,
    data: dataSlice.reducer
  })
)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store
