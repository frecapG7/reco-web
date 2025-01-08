import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { EditPassword } from "../components/dialog/EditPassword";
import { EditEmail } from "../components/dialog/EditEmail";
import { EditAvatar } from "../components/dialog/EditAvatar";
import { useOutletContext } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { FormLocale } from "../components/form/FormLocale";
import { useState } from "react";

export const AccountSettings = () => {
  const { user } = useOutletContext();

  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [openEditEmail, setOpenEditEmail] = useState(false);
  const [openEditAvatar, setOpenEditAvatar] = useState(false);

  const { control } = useFormContext();

  return (
    <Box width="100%">
      <List>
        {/* Edit Avatar */}
        <ListItem divider>
          <ListItemButton onClick={() => setOpenEditAvatar(true)}>
            <ListItemText primary="Avatar" secondary="Change your avatar" />
            <Avatar src={user?.avatar} />
          </ListItemButton>
        </ListItem>

        <ListItem divider>
          <ListItemButton onClick={() => setOpenEditEmail(true)}>
            <ListItemText
              primary="Email"
              secondary={
                user?.email ? (
                  user.email
                ) : (
                  <Typography color="error">
                    You have not registered any email
                  </Typography>
                )
              }
            />
            <EditIcon />
          </ListItemButton>
        </ListItem>
        {/* Edit password */}
        <ListItem divider>
          <ListItemButton onClick={() => setOpenEditPassword(true)}>
            <ListItemText primary="Password" secondary="Change your password" />
            <EditIcon />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem
          secondaryAction={<FormLocale control={control} name="lang" />}
        >
          <ListItemButton>
            <ListItemText primary="Language" />
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
