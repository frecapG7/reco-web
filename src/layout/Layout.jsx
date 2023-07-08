import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavigationBar } from "./NavigationBar";
import { useState } from "react";
import { Box } from "@mui/system";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export const Layout = ({ children }) => {


    const drawerWidth = 240;
    const [openDrawer, setOpenDrawer] = useState(false);


    return (
        <div>
            <AppBar position="fixed"
                sx={{
                    bgColor: 'background.default',
                    color: 'primary'
                }} enableColorOnDark>
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        onClick={() => setOpenDrawer(true)}
                        color="inherit"
                        edge="start">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Recoco
                    </Typography>
                    <IconButton color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 200,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}>
                <NavigationBar onClose={() => setOpenDrawer(false)} />
            </Drawer>
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    marginLeft: openDrawer ? `${drawerWidth}px` : '0px',
                }}>
                <Toolbar />
                {children}
            </Box>
        </div>
    )
}