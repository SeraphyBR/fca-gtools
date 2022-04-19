import { Divider, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BasePage from "../../components/basepage/BasePage"
import { FcatoolsTriadicData } from "../../models/data"
import { getWorkingProject } from "../../redux/data/selectors"
import { getDataFromFcatools } from "../../services/backend"

const Data: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "pages.data" })
  const navigate = useNavigate()

  const project = useSelector(getWorkingProject)

  const [fcaTriadicData, setFcaTriadicData] = useState<FcatoolsTriadicData>()

  useEffect(() => {
    if (project === undefined) {
      navigate("/files")
    }
  }, [project, navigate])

  useEffect(() => {
    if (project !== undefined) {
      getDataFromFcatools(project.id).then((data) => setFcaTriadicData(data))
    }
  }, [project])

  return (
    <BasePage>
      <Typography variant="h4">{t("title") + " - " + project?.name}</Typography>
      <Divider sx={{ margin: "8px 0px" }} />
      <p>{project?.name}</p>
      {fcaTriadicData !== undefined && (
        <div>
          <div>
            <p>BACARS implication rules:</p>
            <ol>
              {fcaTriadicData.bacars_implication_rules.map((r, i) => (
                <li key={i}>
                  {"("}
                  {r.left_side.join(", ")} {"->"} {r.right_side.join(", ")}
                  {")"} {r.condition.join(", ")} {"(sup: "} {r.support} {", conf: "} {r.confidence} {")"}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p>BACARS association rules:</p>
            <ol>
              {fcaTriadicData.bacars_association_rules.map((r, i) => (
                <li key={i}>
                  {"("}
                  {r.left_side.join(", ")} {"->"} {r.right_side.join(", ")}
                  {")"} {r.condition.join(", ")} {"(sup: "} {r.support} {", conf: "} {r.confidence} {")"}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p>BCAARS implication rules:</p>
            <ol>
              {fcaTriadicData.bcaars_implication_rules.map((r, i) => (
                <li key={i}>
                  {"("}
                  {r.left_side.join(", ")} {"->"} {r.right_side.join(", ")}
                  {")"} {r.condition.join(", ")} {"(sup: "} {r.support} {", conf: "} {r.confidence} {")"}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p>BCAARS association rules:</p>
            <ol>
              {fcaTriadicData.bcaars_association_rules.map((r, i) => (
                <li key={i}>
                  {"("}
                  {r.left_side.join(", ")} {"->"} {r.right_side.join(", ")}
                  {")"} {r.condition.join(", ")} {"(sup: "} {r.support} {", conf: "} {r.confidence} {")"}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </BasePage>
  )
}

export default Data
