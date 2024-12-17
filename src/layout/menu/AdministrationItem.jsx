import { useState } from "react";
import { MenuItem } from "../../components/menu/MenuItem";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";

export const AdministrationItem = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Administration" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>

      {/** Sub-menu */}
      <Collapse in={open} unmountOnExit sx={{ pl: 4 }}>
        <List disablePadding>
          <MenuItem
            icon={<SupervisorAccountOutlinedIcon />}
            text="Users"
            path="/administration/users"
          />
          <MenuItem
            icon={<StorefrontOutlinedIcon />}
            text="Marketplace"
            path="/administration/market"
          />
          <MenuItem
            icon={<KeyOutlinedIcon />}
            text="Keys"
            path="/administration/tokens"
          />
        </List>
      </Collapse>
    </>
  );
};
