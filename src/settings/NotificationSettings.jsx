import { useFormContext } from "react-hook-form";

import { List, ListItem, ListItemText, Stack } from "@mui/material";
import { FormSwitch } from "../components/form/FormSwitch";

export const NotificationSettings = () => {
  const { control } = useFormContext();

  return (
    <Stack width="100%">
      <List
        aria-label="notifications-settings"
        sx={{
          width: "100%",
        }}
      >
        <ListItem id="notifications-privacy">
          <ListItemText
            primary="Allow the application to send you notifications"
            secondary="Recoco will send you notifications about your requests and your recommendations activities"
          />
          <FormSwitch control={control} name="notifications" />
        </ListItem>
      </List>
    </Stack>
  );
};
