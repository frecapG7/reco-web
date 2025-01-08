import { useFormContext } from "react-hook-form";
import { List, ListItem, ListItemText } from "@mui/material";
import { FormSwitch } from "../components/form/FormSwitch";

export const PrivacySettings = () => {
  const { control } = useFormContext();

  return (
    <List>
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
        <FormSwitch control={control} name="privacy.privateRecommendations" />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Purchases privacy"
          secondary="You can choose to hide the purchases you made. This one is enable by default, because we know you don't want your friends to know you bought our last Taylor Swift's avatars."
        />
        <FormSwitch control={control} name="purchasesConfidentiality" />
      </ListItem>
    </List>
  );
};
