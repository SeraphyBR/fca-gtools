import { Box, Divider, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import ConceptsDataGrid from "../../components/conceptsdatagrid/ConceptsDataGrid"
import { TriadicConcept } from "../../models/concept"
import { getWorkingContext } from "../../redux/concepts/selectors"
import { getConceptsFromFcatools } from "../../services/backend"

const ConceptsPage: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.concepts" })
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const context = useSelector(getWorkingContext)

  const [concepts, setConcepts] = useState<TriadicConcept[]>([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (context === undefined) {
      navigate("/contexts")
    } else {
      setConcepts([])
      setLoadingData(true)
      getConceptsFromFcatools(context.id)
        .then((data) => {
          setConcepts(data)
        })
        .catch(() => {
          enqueueSnackbar("Ocorreu um erro ao processar os conceitos!", { variant: "error" })
        })
        .finally(() => {
          setLoadingData(false)
        })
    }
  }, [context?.id, navigate])

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + context?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <Box>
        {concepts && (
          <ConceptsDataGrid concepts={concepts} loading={loadingData} sx={{ height: "calc(100vh - 200px)" }} />
        )}
      </Box>
    </BasePage>
  )
}

export default ConceptsPage
