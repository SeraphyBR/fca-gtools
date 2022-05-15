import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Context } from "../../models/context"

type RulesState = {
  context?: Context
}

const initialState: RulesState = {
  context: undefined
}

const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setWorkingContext: (state, action: PayloadAction<Context>) => {
      state.context = action.payload
    }
  }
})

export const rulesActions = rulesSlice.actions

export default rulesSlice
