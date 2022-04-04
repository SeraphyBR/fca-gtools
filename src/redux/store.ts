import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "redux-persist/lib/storage"
import filesSlice from "./files/slice"
import settingsSlice from "./settings/slice"

const filesPersistConfig = {
  key: "files",
  storage,
  blacklist: ["projects"]
}

const persistedReducer = persistReducer(
  {
    key: "root",
    storage
  },
  combineReducers({
    settings: settingsSlice.reducer,
    files: persistReducer(filesPersistConfig, filesSlice.reducer)
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
