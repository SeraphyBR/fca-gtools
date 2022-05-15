import { MoreVertRounded } from "@mui/icons-material"
import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from "@mui/material"
import React from "react"

export type IconMenuItem = {
  icon: JSX.Element
  label: string
  action?: () => void
}

type IconMenuProps = {
  items: IconMenuItem[]
}

const IconMenu: React.FC<IconMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement>()

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOnClose = () => {
    setAnchorEl(undefined)
  }

  const open = anchorEl !== undefined

  return (
    <>
      <IconButton onClick={handleOnClick}>
        <MoreVertRounded />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleOnClose}>
        <MenuList>
          {props.items.map((item) => (
            <MenuItem key={item.label} onClick={item.action}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default IconMenu
