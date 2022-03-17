import React from "react"
import { Drawer, IconButton, Tooltip } from "@mui/material"
import { AnalyticsTwoTone, DashboardTwoTone, InsertDriveFileTwoTone, SettingsTwoTone } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation("translation", { keyPrefix: "pages" })

  const handleOnClickSettingsIcon = () => {
    navigate("/settings")
  }

  const handleOnClickFilesIcon = () => {
    navigate("/files")
  }

  return (
    <Drawer variant="permanent" anchor="left" open={true} PaperProps={{ sx: { width: "56px" } }}>
      <Tooltip title={t("files.title").toString()} placement="right" arrow>
        <IconButton color="primary" size="large" onClick={handleOnClickFilesIcon}>
          <InsertDriveFileTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Data" placement="right" arrow>
        <IconButton color="primary" size="large">
          <AnalyticsTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("settings.title").toString()} placement="right" arrow>
        <IconButton color="primary" size="large" onClick={handleOnClickSettingsIcon} sx={{ marginTop: "auto" }}>
          <SettingsTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
    </Drawer>
  )
}

export default Sidebar
