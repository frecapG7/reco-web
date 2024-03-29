import { Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';

const AccountMenuItem = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <ListItem>
                <ListItemButton onClick={() => setOpen(!open)}>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText>
                        My account
                    </ListItemText>
                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}

                </ListItemButton>
            </ListItem>

            {/** Sub-menu */}
            <Collapse in={open} unmountOnExit sx={{ pl: 4 }} >
                <List component="div" disablePadding>
                    <NavigationItem icon={<WhatshotIcon />} text="My requests" path="/my/requests" />
                    <NavigationItem icon={<SettingsIcon />} text="Settings" path="/my/settings" />
                </List>
            </Collapse>
        </>
    )

}
const NavigationItem = ({ icon, text, path }) => {


    return (
        <ListItem>
            <ListItemButton component={NavLink} to={path}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText>
                    {text}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    )
}


export const NavigationBar = ({ onClose }) => {

    const navigate = useNavigate();


    const handleLogout = () => {
        console.log("Logout");
        navigate("/login");
    }

    return (
        <>
            <Box>
                <IconButton onClick={onClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Divider />
            <Box>
                <List>
                    <NavigationItem icon={<WhatshotIcon />}
                        text="Trending"
                        path="/requests" />
                    <NavigationItem
                        icon={<AddIcon />}
                        text="Create Request"
                        path="/requests/new" />
                    <AccountMenuItem />
                    <ListItem>
                        <ListItemButton onClick={() => handleLogout()}>
                            <ListItemIcon>
                                <PowerSettingsNewIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Logout
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

        </>
    )
}

