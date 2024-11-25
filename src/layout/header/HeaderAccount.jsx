import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import { useState } from "react";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

import { useGetBalance, useGetUser } from "../../hooks/api/users/useUsers";

export const HeaderAccount = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { data } = useGetUser(user?.id);
  const { data: balance } = useGetBalance(user?.id);

  return (
    <Box>
      <Stack spacing={1} direction="row" alignItems="center">
        <Badge
          showZero
          badgeContent={balance?.balance}
          color="success"
          overlap="rectangular"
        >
          <SavingsOutlinedIcon color="yellow" />
        </Badge>

        <IconButton
          id="account-menu-button"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Avatar
            src={data?.avatar}
            alt={user?.name}
            sx={{
              width: 32,
              height: 32,
            }}
          />
        </IconButton>
      </Stack>

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
              navigate("./account/my-purchases");
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Purchases" />
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
