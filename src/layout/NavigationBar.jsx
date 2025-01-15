import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import { NavLink, useNavigate } from "react-router-dom";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { AdministrationItem } from "./menu/AdministrationItem";
import { useAuthSession } from "../context/AuthContext";

import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useTranslation } from "react-i18next";

const NavigationItem = ({ icon, text, path }) => {
  return (
    <ListItem>
      <ListItemButton component={NavLink} to={path}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export const NavigationBar = ({ onClose }) => {
  const navigate = useNavigate();
  const { session, logout } = useAuthSession();

  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box>
      <Box
        sx={{
          py: 2,
          display: { sm: "none" },
        }}
      >
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
      </Box>
      <List>
        <NavigationItem
          icon={<WhatshotOutlinedIcon fontSize="large" />}
          text={t("menu.home")}
          path="/"
        />
        <NavigationItem
          icon={<AddIcon />}
          text={t("menu.newRequest")}
          path="/requests/new"
        />

        <NavigationItem
          icon={<StorefrontOutlinedIcon />}
          text={t("menu.store")}
          path="/stores"
        />
        {/* {session?.user && <AccountMenuItem />} */}

        {session?.user?.role === "ADMIN" && <AdministrationItem />}

        <Divider />
        {session?.loggedIn && (
          <ListItem>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{t("logout")}</ListItemText>
            </ListItemButton>
          </ListItem>
        )}
        {!session?.loggedIn && (
          <ListItem>
            <ListItemButton onClick={() => navigate("/login")}>
              <ListItemIcon>
                <LoginOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{t("login")}</ListItemText>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );
};
