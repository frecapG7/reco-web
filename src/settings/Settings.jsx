import {
  Container,
  Box,
  Tabs,
  Tab,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import {
  useGetSettings,
  usePatchSettings,
} from "../hooks/api/users/useSettings";
import { useAuthSession } from "../context/AuthContext";
import { useGetUser } from "../hooks/api/users/useUsers";
import { FormProvider, useForm } from "react-hook-form";
export const Settings = () => {
  const [tab, setTab] = useState("account");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(tab);
  }, [tab, navigate]);

  const { session } = useAuthSession();

  const { data: user } = useGetUser(session?.user?.id);
  const { data: settings } = useGetSettings(session?.user?.id);
  const { mutate: patchSettings, isPending } = usePatchSettings(
    session?.user?.id
  );

  const formMethods = useForm();

  useEffect(() => {
    if (settings) formMethods.reset(settings);
  }, [settings, formMethods.reset]);

  const onSubmit = useCallback(
    (data) => {
      patchSettings(data);
    },
    [patchSettings]
  );

  useEffect(() => {
    if (formMethods.formState.isDirty) formMethods.handleSubmit(onSubmit)();
  }, [formMethods.formState.isDirty, onSubmit, formMethods.handleSubmit]);

  return (
    <Container>
      <Box>
        <h1>Settings</h1>
      </Box>

      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab icon={<PersonIcon />} label="Account" value="account" />
        <Tab
          icon={<NotificationsIcon />}
          label="Notifications"
          value="notifications"
        />
        <Tab icon={<LockIcon />} label="Privacy" value="privacy" />
      </Tabs>

      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        aria-label="settings"
        m={2}
      >
        <FormProvider {...formMethods}>
          <Outlet
            context={{
              patchSettings,
              settings,
              user,
            }}
          />
        </FormProvider>
      </Box>

      <Backdrop open={isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
