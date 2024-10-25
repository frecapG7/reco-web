import {
  Avatar,
  Badge,
  Box,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";

import { useGetUser } from "../../hooks/api/users/useUsers";

export const HeaderAccount = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { data } = useGetUser(user?.id);

  return (
    <Box>
      <IconButton
        id="account-menu-button"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Badge
          showZero
          badgeContent={data?.balance}
          color="yellow"
          overlap="rectangular"
        >
          <Avatar
            src={data?.avatar}
            alt={user?.name}
            sx={{
              width: 32,
              height: 32,
            }}
          />
        </Badge>
      </IconButton>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        disableScrollLock
        marginThreshold={20}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate("./account");
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <Face5OutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("./account/settings");
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
