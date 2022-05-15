import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rulesSlice from "./rules/slice"
import editorSlice from "./editor/slice"
import contextsSlice from "./contexts/slice"
import settingsSlice from "./settings/slice"

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["settings"]
  },
  combineReducers({
    settings: settingsSlice.reducer,
    contexts: contextsSlice.reducer,
    rules: rulesSlice.reducer,
    editor: editorSlice.reducer
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
