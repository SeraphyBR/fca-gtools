import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Context } from "../../models/context"
import { FcatoolsTriadicData } from "../../models/rule"
import { fetchDataFromFcatools } from "./actions"

type RulesState = {
  context?: Context
  fcatoolsData?: FcatoolsTriadicData
  ruleType: string
  ruleTypeVariant: string
}

const initialState: RulesState = {
  context: undefined,
  fcatoolsData: undefined,
  ruleType: "",
  ruleTypeVariant: ""
}

const rulesSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setWorkingContext: (state, action: PayloadAction<Context>) => {
      state.context = action.payload
      state.fcatoolsData = undefined
      state.ruleType = ""
      state.ruleTypeVariant = ""
    },
    setRuleType: (state, action: PayloadAction<string>) => {
      state.ruleType = action.payload
    },
    setRuleTypeVariant: (state, action: PayloadAction<string>) => {
      state.ruleTypeVariant = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataFromFcatools.fulfilled, (state, action) => {
      state.fcatoolsData = action.payload
    })
  }
})

export const rulesActions = rulesSlice.actions

export default rulesSlice
