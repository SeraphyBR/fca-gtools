import { Box, Button, Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import RulesDataGrid from "../../components/rulesdatagrid/RulesDataGrid"
import { FcatoolsTriadicData, TriadicAssociationRule } from "../../models/rule"
import { fetchDataFromFcatools } from "../../redux/rules/actions"
import {
  getFcatoolsData,
  getSelectedRuleType,
  getSelectedRuleTypeVariant,
  getWorkingContext
} from "../../redux/rules/selectors"
import { rulesActions } from "../../redux/rules/slice"
import { useAppDispatch } from "../../redux/store"

const RulesPage: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.rules" })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const context = useSelector(getWorkingContext)
  const fcaTriadicData = useSelector(getFcatoolsData)
  const ruleType = useSelector(getSelectedRuleType)
  const ruleTypeVariant = useSelector(getSelectedRuleTypeVariant)

  const [rules, setRules] = useState<TriadicAssociationRule[]>()
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (context === undefined) {
      navigate("/contexts")
    }
  }, [context, navigate])

  const changeDisplayedRule = (type: string, fcaTriadicData: FcatoolsTriadicData) => {
    if (fcaTriadicData === undefined) return

    switch (type) {
      case "bacars-a":
        setRules(fcaTriadicData.bacars_association_rules)
        break
      case "bacars-i":
        setRules(fcaTriadicData.bacars_implication_rules)
        break
      case "bcaars-a":
        setRules(fcaTriadicData.bcaars_association_rules)
        break
      case "bcaars-i":
        setRules(fcaTriadicData.bcaars_implication_rules)
        break
    }
  }

  useEffect(() => {
    if (context === undefined) return

    let type = ruleType + "-" + ruleTypeVariant

    if (fcaTriadicData === undefined) {
      if (ruleType !== "") {
        setLoadingData(true)
        setRules([])
        dispatch(fetchDataFromFcatools(context.id))
          .unwrap()
          .then(() => {
            setLoadingData(false)
          })
        if (ruleTypeVariant === "") dispatch(rulesActions.setRuleTypeVariant("a"))
      }
    } else {
      changeDisplayedRule(type, fcaTriadicData)
    }
  }, [ruleType, ruleTypeVariant, context, fcaTriadicData])

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + context?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <Typography>Selecione o tipo de regra abaixo:</Typography>
      <Box mb="24px" mt="16px" width="100%" height="36px" alignItems="center" display="inline-flex" gap="12px">
        <ToggleButtonGroup
          color="primary"
          onChange={(_, value) => dispatch(rulesActions.setRuleType(value))}
          value={ruleType}
          exclusive
        >
          <ToggleButton value="bcaars">BCAARS</ToggleButton>
          <ToggleButton value="bacars">BACARS</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          color="primary"
          value={ruleTypeVariant}
          onChange={(_, value) => dispatch(rulesActions.setRuleTypeVariant(value))}
          exclusive
          sx={{ ml: "16px" }}
        >
          <ToggleButton value="a" sx={{ textTransform: "none" }}>
            Association
          </ToggleButton>
          <ToggleButton value="i" sx={{ textTransform: "none" }}>
            Implication
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>{rules && <RulesDataGrid rules={rules} loading={loadingData} sx={{ height: "calc(100vh - 200px)" }} />}</Box>
    </BasePage>
  )
}

export default RulesPage
