import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Context } from "../../models/project"

type DataState = {
  context?: Context
}

const initialState: DataState = {
  context: undefined
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setWorkingContext: (state, action: PayloadAction<Context>) => {
      state.context = action.payload
    }
  }
})

export const dataActions = dataSlice.actions

export default dataSlice
