import { RootState } from "../store"

export const getWorkingContext = (state: RootState) => state.rules.context

export const getFcatoolsData = (state: RootState) => state.rules.fcatoolsData

export const getSelectedRuleType = (state: RootState) => state.rules.ruleType

export const getSelectedRuleTypeVariant = (state: RootState) => state.rules.ruleTypeVariant
