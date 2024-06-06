import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";

import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import SettingsIcon from "@mui/icons-material/Settings";
import { AdministrationItem } from "./menu/AdministrationItem";
import { useAuthSession } from "../context/AuthContext";

const AccountMenuItem = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText>My account</ListItemText>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>

      {/** Sub-menu */}
      <Collapse in={open} unmountOnExit sx={{ pl: 4 }}>
        <List component="div" disablePadding>
          <NavigationItem
            icon={<WhatshotIcon />}
            text="My requests"
            path="/my/requests"
          />
          <NavigationItem
            icon={<SettingsIcon />}
            text="Settings"
            path="/my/settings"
          />
        </List>
      </Collapse>
    </>
  );
};

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

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Toolbar />
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
      <Box>
        <List>
          <NavigationItem
            icon={<WhatshotOutlinedIcon fontSize="large" />}
            text="Home"
            path="/"
          />
          <NavigationItem
            icon={<AddIcon />}
            text="Create Request"
            path="/requests/new"
          />
          {session?.user && <AccountMenuItem />}

          {session?.user?.role === "admin" && <AdministrationItem />}

          <Divider />
          {session?.loggedIn && (
            <ListItem>
              <ListItemButton onClick={() => handleLogout()}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
          {!session?.loggedIn && (
            <ListItem>
              <ListItemButton onClick={() => navigate("/login")}>
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Login</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
};
