import { Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Box } from "@mui/system"

import WhatshotIcon from '@mui/icons-material/Whatshot';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useState } from "react";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
                        <NavigationItem icon={<WhatshotIcon />} text="My requests" path="/requests/my" />
                        <NavigationItem icon={<SettingsIcon />} text="Settings" path="/requests/settings" />
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
                </List>
            </Box>

        </>
    )
}

