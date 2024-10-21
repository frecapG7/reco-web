import { useOutletContext } from "react-router-dom";
import {
  useGetSettings,
  usePatchSettings,
  useResetSettings,
} from "../../hooks/api/users/useSettings";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Divider,
  Zoom,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { FormText } from "../../components/form/FormText";
import { FormSwitch } from "../../components/form/FormSwitch";

export const AccountSettings = () => {
  const { user } = useOutletContext();

  const { data: settings } = useGetSettings(user?.id);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  const { mutate: patchSettings, isPending } = usePatchSettings(user?.id);
  const resetSettings = useResetSettings(user?.id);

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
    <>
      <Stack spacing={2}>
        <List
          aria-label="general-settings"
          sx={{
            width: "100%",
            px: 2,
          }}
          subheader={<ListSubheader component={Box}>General</ListSubheader>}
        >
          <ListItem id="language">
            <ListItemText
              primary="Language"
              secondary="Select the language you want to use in the application"
            />
            <FormText control={control} name="lang" disabled />
          </ListItem>
        </List>

        <Divider />

        <List
          aria-label="notifications-settings"
          sx={{
            width: "100%",
            // bgcolor: "primary.main",
            px: 2,
          }}
          subheader={
            <ListSubheader component={Box}>Notifications</ListSubheader>
          }
        >
          <ListItem id="notifications-privacy">
            <ListItemText
              primary="Allow the application to send you notifications"
              secondary="Recoco will send you notifications about your requests and your recommendations activities"
            />
            <FormSwitch control={control} name="notifications" />
          </ListItem>
        </List>
        <Divider />

        <List
          sx={{
            width: "100%",
            // bgcolor: "background.paper",
            px: 2,
          }}
          subheader={<ListSubheader>Privacy</ListSubheader>}
        >
          <ListItem id="request-privacy">
            <ListItemText
              primary="Requests privacy"
              secondary="You can choose to hide the requests you make to other users. If you're ashamed and want nobody to know of your Taylor Swift crush, this is for you."
            />
            <FormSwitch control={control} name="privacy.privateRequests" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Recommendations privacy"
              secondary="You can choose to hide the recommendations you made, this way they will be only visible by you. Maybe it's still related to the Taylor Swift crush, who knows?"
            />
            <FormSwitch
              control={control}
              name="privacy.privateRecommendations"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Purchases privacy"
              secondary="You can choose to hide the purchases you made. This one is enable by default, because we know you don't want your friends to know you bought our last Taylor Swift's avatars."
            />
            <FormSwitch control={control} name="purchasesConfidentiality" />
          </ListItem>
        </List>
      </Stack>
      <Zoom in={!settings?.isDefault} mountOnEnter unmountOnExit>
        <Box align="center">
          <Button
            variant="contained"
            color="primary"
            width={50}
            onClick={() => resetSettings.mutate({})}
            disabled={resetSettings.isPending}
          >
            {resetSettings.isPending ? (
              <CircularProgress />
            ) : (
              "Reset default settings"
            )}
          </Button>
        </Box>
      </Zoom>

      <Box mt={5} p={2}>
        <Typography variant="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Box>

      <Backdrop open={Boolean(isPending)}>
        <CircularProgress />
      </Backdrop>
    </>
  );
};
