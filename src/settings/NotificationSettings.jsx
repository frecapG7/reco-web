import { useForm } from "react-hook-form";
import { useAuthSession } from "../context/AuthContext";
import {
  useGetSettings,
  usePatchSettings,
  useResetSettings,
} from "../hooks/api/users/useSettings";
import { useCallback, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { FormSwitch } from "../components/form/FormSwitch";
import { useOutletContext } from "react-router-dom";

export const NotificationSettings = () => {
  const { user, patchSettings } = useOutletContext;
  const { data: settings } = useGetSettings(user?.id);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const onSubmit = useCallback(
    (data) => {
      patchSettings(data);
    },
    [patchSettings]
  );

  useEffect(() => {
    if (isDirty) handleSubmit(onSubmit)();
  }, [isDirty, onSubmit, handleSubmit]);

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
