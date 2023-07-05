import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Box } from "@mui/system"

import WhatshotIcon from '@mui/icons-material/Whatshot';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
                </List>
            </Box>

        </>
    )
}

