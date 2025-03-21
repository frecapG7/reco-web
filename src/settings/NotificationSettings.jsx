import { useFormContext } from "react-hook-form";

import { List, ListItem, ListItemText, Stack } from "@mui/material";
import { FormSwitch } from "../components/form/FormSwitch";
import { useTranslation } from "react-i18next";

export const NotificationSettings = () => {
  const { control } = useFormContext();

  const { t } = useTranslation();

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
            primary={t("settings.notifications.title")}
            secondary={t("settings.notifications.description")}
          />
          <FormSwitch control={control} name="notifications" />
        </ListItem>
      </List>
    </Stack>
  );
};
