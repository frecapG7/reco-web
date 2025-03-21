import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { EditPassword } from "../components/dialog/EditPassword";
import { EditEmail } from "../components/dialog/EditEmail";
import { EditAvatar } from "../components/dialog/EditAvatar";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "react-i18next";

export const AccountSettings = () => {
  const { user } = useOutletContext();

  const { t } = useTranslation();
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);

  return (
    <Box width="100%">
      <List>
        {/* Edit Avatar */}
        <ListItem divider>
          <ListItemButton onClick={() => setOpenEditAvatar(true)}>
            <ListItemIcon>
              <FaceRetouchingNaturalOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("settings.avatar.title")}
              secondary={t("settings.avatar.description")}
            />
            <Badge
              badgeContent={<ModeEditOutlineOutlinedIcon fontSize="small" />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar src={user?.avatar} />
            </Badge>
          </ListItemButton>
        </ListItem>

        <ListItem divider>
          <ListItemButton onClick={() => setOpenEditEmail(true)}>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("settings.email.title")}
              secondary={t("settings.email.description")}
            />
            <Badge
              badgeContent={<ModeEditOutlineOutlinedIcon fontSize="small" />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Typography
                noWrap
                sx={{ maxWidth: { xs: 75, md: 300, lg: 500 } }}
              >
                {user?.email
                  ? user.email
                  : " You have not registered any email"}
              </Typography>
            </Badge>
          </ListItemButton>
        </ListItem>
        {/* Edit password */}
        <ListItem>
          <ListItemButton onClick={() => setOpenEditPassword(true)}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              primary={t("settings.password.title")}
              secondary={t("settings.password.description")}
            />
            <EditIcon />
          </ListItemButton>
        </ListItem>
      </List>

      <EditPassword
        open={openEditPassword}
        onClose={() => setOpenEditPassword(false)}
        user={user}
      />
      <EditEmail
        open={openEditEmail}
        user={user}
        onClose={() => setOpenEditEmail(false)}
      />

      <EditAvatar
        open={openEditAvatar}
        onClose={() => setOpenEditAvatar(false)}
        user={user}
      />
    </Box>
  );
};
