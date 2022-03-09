import React from "react"
import { Drawer, IconButton, Tooltip } from "@mui/material"
import { DashboardTwoTone, InsertDriveFileTwoTone, SettingsTwoTone } from "@mui/icons-material"

const Sidebar: React.FC = () => {
  return (
    <Drawer variant="persistent" anchor="left" open={true}>
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
        <IconButton color="primary" size="large" sx={{ marginTop: "auto" }}>
          <SettingsTwoTone sx={{ fontSize: "32px" }} />
        </IconButton>
      </Tooltip>
    </Drawer>
  )
}

export default Sidebar
