import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavigationBar } from "./NavigationBar";
import { useState } from "react";
import { Box } from "@mui/system";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthLayout = ({ children }) => {


    const drawerWidth = 240;
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const {user, logout} = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    if(!user)
        return <Navigate to="/login" />;


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
                    <IconButton color="inherit" onClick={handleLogout}>
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Toolbar>
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
            </AppBar>

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