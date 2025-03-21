import {
  Container,
  Box,
  Tabs,
  Tab,
  Backdrop,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import {
  useGetSettings,
  usePatchSettings,
} from "../hooks/api/users/useSettings";
import { useGetMe } from "../hooks/api/users/useUsers";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
export const Settings = () => {
  const [tab, setTab] = useState("account");
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    navigate(tab);
  }, [tab, navigate]);

  const { data: user } = useGetMe();
  const { data: settings } = useGetSettings(user?.id, {
    enabled: !!user,
  });
  const { mutate: patchSettings, isPending } = usePatchSettings(user?.id);

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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="title">{t("settings.title")}</Typography>
          <SettingsOutlinedIcon fontSize="large" />
        </Box>
      </Box>

      <Paper variant="brutalist1">
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="ghost"
        >
          <Tab
            icon={<PersonIcon />}
            label={t("settings.tabs.account")}
            value="account"
          />
          <Tab
            icon={<NotificationsIcon />}
            label={t("settings.tabs.notifications")}
            value="notifications"
          />
          <Tab
            icon={<LockIcon />}
            label={t("settings.tabs.privacy")}
            value="privacy"
          />
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
      </Paper>

      <Backdrop open={isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
