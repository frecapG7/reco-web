import { useFormContext } from "react-hook-form";
import { List, ListItem, ListItemText } from "@mui/material";
import { FormSwitch } from "../components/form/FormSwitch";
import { useTranslation } from "react-i18next";

export const PrivacySettings = () => {
  const { control } = useFormContext();

  const { t } = useTranslation();

  return (
    <List
      sx={{
        width: "100%",
      }}
    >
      <ListItem id="request-privacy">
        <ListItemText
          primary={t("settings.privacy.requests.title")}
          secondary={t("settings.privacy.requests.description")}
        />
        <FormSwitch control={control} name="privacy.privateRequests" />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={t("settings.privacy.recommendations.title")}
          secondary={t("settings.privacy.recommendations.description")}
        />
        <FormSwitch control={control} name="privacy.privateRecommendations" />
      </ListItem>
    </List>
  );
};
