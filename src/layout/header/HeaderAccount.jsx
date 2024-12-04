import {
  Avatar,
  Badge,
  Box,
  Divider,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useGetBalance, useGetUser } from "../../hooks/api/users/useUsers";
import { useAuthSession } from "../../context/AuthContext";

export const HeaderAccount = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { logout } = useAuthSession();
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
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: 300,
            },
          },
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
            <Avatar
              src={data?.avatar}
              alt={user?.name}
              sx={{
                width: 40,
                height: 40,
                mr: 2,
              }}
            />
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("./account/my-purchases");
              setAnchorEl(null);
            }}
          >
            <Inventory2OutlinedIcon
              // fontSize="large"
              sx={{
                width: 40,
                height: 40,
                mr: 2,
              }}
            />
            Purchases
          </MenuItem>
          <Divider />

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
          <MenuItem
            onClick={() => {
              logout();
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
