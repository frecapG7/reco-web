import {
  Avatar,
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import KeyIcon from "@mui/icons-material/Key";
import { useGetMe } from "../../hooks/api/users/useUsers";
import { useAuthSession } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { CurrencyIcon } from "../../components/icons/CurrencyIcon";

export const HeaderAccount = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const { logout } = useAuthSession();
  const { data: user } = useGetMe();

  const { t } = useTranslation();
  return (
    <Box>
      <IconButton
        id="account-menu-button"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Avatar
          src={user?.avatar}
          alt={user?.name}
          sx={{
            width: 32,
            height: 32,
          }}
        />
      </IconButton>

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
            elevation: 5,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate("./account");
              setAnchorEl(null);
            }}
            divider
          >
            <Avatar
              src={user?.avatar}
              alt={user?.name}
              sx={{
                mr: 1,
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              {user?.name}
            </Typography>
            <Chip
              label={user?.balance}
              size="small"
              color="primary"
              icon={<CurrencyIcon />}
              sx={{
                ml: 1,
              }}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("./account/my-purchases");
              setAnchorEl(null);
            }}
            dense
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
            dense
          >
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary={t("menu.account.keys")} />
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("./settings");
              setAnchorEl(null);
            }}
            dense
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
            dense
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
