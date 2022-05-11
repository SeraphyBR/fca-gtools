import { Box, Button, Divider, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import RulesDataGrid from "../../components/rulesdatagrid/RulesDataGrid"
import { FcatoolsTriadicData } from "../../models/data"
import { getWorkingContext } from "../../redux/data/selectors"
import { getDataFromFcatools } from "../../services/backend"

const DataPage: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.data" })
  const navigate = useNavigate()

  const context = useSelector(getWorkingContext)

  const [fcaTriadicData, setFcaTriadicData] = useState<FcatoolsTriadicData>()

  useEffect(() => {
    if (context === undefined) {
      navigate("/contexts")
    }
  }, [context, navigate])

  useEffect(() => {
    if (context !== undefined) {
      getDataFromFcatools(context.id).then((data) => setFcaTriadicData(data))
    }
  }, [context])

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + context?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <Box mb="24px" width="100%" height="36px" alignItems="center" display="inline-flex" gap="12px">
        <Button variant="outlined">Gerar regras BACARS</Button>
        <Button variant="outlined">Gerar regras BCAARS</Button>
      </Box>
      <Box>
        <RulesDataGrid
          rules={fcaTriadicData ? fcaTriadicData.bacars_implication_rules : []}
          loading={fcaTriadicData === undefined}
          sx={{ height: "calc(100vh - 200px)" }}
        />
      </Box>
    </BasePage>
  )
}

export default DataPage
