import React from "react"
import { Drawer, IconButton, Tooltip } from "@mui/material"
import { DashboardTwoTone, InsertDriveFileTwoTone, SettingsTwoTone } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const Sidebar: React.FC = () => {
  const navigate = useNavigate()

  const handleOnClickSettingsIcon = () => {
    navigate("/settings")
  }

  return (
    <Drawer variant="permanent" anchor="left" open={true} PaperProps={{ sx: { width: "56px" } }}>
      <Tooltip title="Files" placement="right" arrow>
        <IconButton color="primary" size="large">
          <InsertDriveFileTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Data" placement="right" arrow>
        <IconButton color="primary" size="large">
          <DashboardTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings" placement="right" arrow>
        <IconButton color="primary" size="large" onClick={handleOnClickSettingsIcon} sx={{ marginTop: "auto" }}>
          <SettingsTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
    </Drawer>
  )
}

export default Sidebar
