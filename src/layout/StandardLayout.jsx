import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import icon from "../assets/img/icon.png";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerContent } from "./DrawerContent";
import { NavigationBar } from "./NavigationBar";

const Header = ({ toggleDrawer }) => {
  return (
    <AppBar>
      <Toolbar>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box component="img" src={icon} sx={{ width: "40px" }} alt="logo" />

          <Box>
            <Typography variant="h6">My App</Typography>
            <Typography variant="body2">Welcome to my app</Typography>
          </Box>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const Footer = () => {
  return (
    <Box component="footer">
      <Paper elevation={0} py={2}>
        <Typography textAlign="center">v1.0.0</Typography>
      </Paper>
    </Box>
  );
};

export const StandardLayout = ({ children }) => {
  const [toggleDrawer, setToggleDrawer] = useState(true);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Header toggleDrawer={setToggleDrawer} />
      <Container
        sx={{
          flexGrow: 1,
        }}
      >
        <Drawer
          variant="persistent"
          anchor="left"
          sx={{
            width: 200,
            flexShrink: 0,
          }}
          open={toggleDrawer}
          onClose={() => setToggleDrawer(false)}
        >
          <NavigationBar onClose={() => setToggleDrawer(false)} />
        </Drawer>
        <Box
          sx={{
            my: 10,
          }}
        >
          {children}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
