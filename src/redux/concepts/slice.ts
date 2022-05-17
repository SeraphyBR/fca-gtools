import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Context } from "../../models/context"

type ConceptsState = {
  context?: Context
}

const initialState: ConceptsState = {
  context: undefined
}

const conceptsSlice = createSlice({
  name: "concepts",
  initialState,
  reducers: {
    setWorkingContext: (state, action: PayloadAction<Context>) => {
      state.context = action.payload
    }
  }
})

export const conceptsActions = conceptsSlice.actions

export default conceptsSlice
