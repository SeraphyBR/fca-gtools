import React from "react"
import { Box, BoxProps, Drawer, IconButton, SxProps, Theme, Tooltip } from "@mui/material"
import {
  AnalyticsTwoTone,
  DashboardTwoTone,
  GridOnTwoTone,
  InsertDriveFileTwoTone,
  SettingsTwoTone
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation("translation", { keyPrefix: "pages" })

  const activeBoxProps = (route: string) => {
    const isActive = location.pathname.includes(route)

    return {
      bgcolor: isActive ? (theme: Theme) => theme.palette.primary.main + "33" : undefined,
      borderLeft: isActive ? (theme: Theme) => "3px solid " + theme.palette.primary.main : undefined
    } as BoxProps
  }

  const activeIconButtonSxProps = (route: string) => {
    const isActive = location.pathname.includes(route)

    return {
      ml: isActive ? "-3px" : undefined
    } as SxProps<Theme>
  }

  const pageButtons = [
    {
      id: "files",
      IconComponent: InsertDriveFileTwoTone
    },
    {
      id: "data",
      IconComponent: AnalyticsTwoTone
    },
    {
      id: "editor",
      IconComponent: GridOnTwoTone
    },
    {
      id: "settings",
      IconComponent: SettingsTwoTone,
      customBoxProps: { mt: "auto" } as BoxProps
    }
  ]

  return (
    <Drawer variant="permanent" anchor="left" open={true} PaperProps={{ sx: { width: "56px", overflow: "hidden" } }}>
      {pageButtons.map((b) => (
        <Box key={b.id} {...b.customBoxProps} {...activeBoxProps(b.id)}>
          <Tooltip title={t(b.id + ".title").toString()} placement="right" arrow>
            <IconButton
              color="primary"
              size="large"
              onClick={() => navigate("/" + b.id)}
              sx={activeIconButtonSxProps(b.id)}
            >
              <b.IconComponent sx={{ fontSize: "32px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </Drawer>
  )
}

export default Sidebar
