import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
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
import KeyIcon from "@mui/icons-material/Key";
import { useGetBalance, useGetUser } from "../../hooks/api/users/useUsers";
import { useAuthSession } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

export const HeaderAccount = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { logout } = useAuthSession();
  const { data } = useGetUser(user?.id);
  const { data: balance } = useGetBalance(user?.id, false, {
    enabled: !!user?.id && open,
  });

  const { t } = useTranslation();
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
            <ListSubheader disableGutters>
              <Avatar
                src={data?.avatar}
                alt={user?.name}
                sx={
                  {
                    // width: 40,
                    // height: 40,
                    // mr: 2,
                  }
                }
              />
            </ListSubheader>
            <ListItemText primary={t("menu.account.profile")} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("./account/my-purchases");
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <Inventory2OutlinedIcon />
            </ListItemIcon>

            <ListItemText primary={t("menu.account.purchases")} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("./account/my-keys");
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary={t("menu.account.keys")} />
          </MenuItem>
          <Divider />

          <MenuItem
            onClick={() => {
              navigate("./settings");
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
