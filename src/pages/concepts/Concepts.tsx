import { Box, Divider, Typography } from "@mui/material"
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

  const context = useSelector(getWorkingContext)

  const [concepts, setConcepts] = useState<TriadicConcept[]>([])

  useEffect(() => {
    if (context === undefined) {
      navigate("/contexts")
    } else {
      getConceptsFromFcatools(context.id).then((data) => {
        setConcepts(data)
      })
    }
  }, [context, navigate])

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + context?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <Box>
        {concepts && <ConceptsDataGrid concepts={concepts} loading={false} sx={{ height: "calc(100vh - 200px)" }} />}
      </Box>
    </BasePage>
  )
}

export default ConceptsPage
