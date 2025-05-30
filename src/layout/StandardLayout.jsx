import { AppBar, Box, CssBaseline, Drawer, Toolbar } from "@mui/material";
import { useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { LayoutHeader } from "./LayoutHeader";

const drawerWidth = 150;

export const StandardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box component="main" display="flex">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          borderRadius: 0,
        }}
      >
        <Toolbar>
          <LayoutHeader toggleMenu={handleDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="nav-bar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "background.default",
              transition: "width 0.2s",
              mt: 10,
            },
          }}
        >
          <NavigationBar onClose={handleDrawerClose} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "flex" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              mt: 10,
              backgroundColor: "inherit",
              border: "none",
              overflow: "auto",
              maxHeight: 700,
              "::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox,
            },
          }}
          open
        >
          <NavigationBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        display="flex"
        sx={{
          my: 10,
          flexGrow: 1,
          p: { xs: 0, sm: 2 },
          ml: { sm: 10 },
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
