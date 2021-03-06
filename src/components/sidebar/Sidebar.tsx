import React from "react"
import { Box, BoxProps, Drawer, IconButton, SxProps, Theme, Tooltip } from "@mui/material"
import {
  AnalyticsTwoTone,
  Assessment,
  AssessmentTwoTone,
  DashboardTwoTone,
  GridOnTwoTone,
  InsertDriveFileTwoTone,
  SettingsTwoTone
} from "@mui/icons-material"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { getEditorContextData } from "../../redux/editor/selectors"
import { RootState } from "../../redux/store"
import { getWorkingContext as getWorkingContextRules } from "../../redux/rules/selectors"
import { getWorkingContext as getWorkingContextConcepts } from "../../redux/concepts/selectors"

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation("translation", { keyPrefix: "pages" })

  const haveContextData = useSelector((state: RootState) => getEditorContextData(state) !== undefined)
  const haveWorkingContextRules = useSelector((state: RootState) => getWorkingContextRules(state) !== undefined)
  const haveWorkingContextConcepts = useSelector((state: RootState) => getWorkingContextConcepts(state) !== undefined)

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
      id: "contexts",
      IconComponent: InsertDriveFileTwoTone
    },
    {
      id: "editor",
      IconComponent: GridOnTwoTone,
      disabled: !haveContextData
    },
    {
      id: "rules",
      IconComponent: AnalyticsTwoTone,
      disabled: !haveWorkingContextRules
    },
    {
      id: "concepts",
      IconComponent: AssessmentTwoTone,
      disabled: !haveWorkingContextConcepts
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
            <span>
              <IconButton
                color="primary"
                size="large"
                onClick={() => navigate("/" + b.id)}
                sx={activeIconButtonSxProps(b.id)}
                disabled={b.disabled}
              >
                <b.IconComponent sx={{ fontSize: "32px" }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      ))}
    </Drawer>
  )
}

export default Sidebar
