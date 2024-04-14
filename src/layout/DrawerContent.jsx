import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

export const DrawerContent = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <List>
        <ListItemButton onClick={() => navigate("/administration")}>
          <ListItemIcon>
            <AdminPanelSettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Administation</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
};
