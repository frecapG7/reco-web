import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Zoom,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormText } from "../form/FormText";
import { RecommendationProvider } from "./RecommendationProvider";
import { useSearchRecommendations } from "../../hooks/api/recommendations/recommendations";
import { useTranslation } from "react-i18next";
import { RequestType } from "../request/RequestType";

export const RecommendationForm = ({
  requestType,
  onSubmit,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const search = useWatch({
    control,
    name: "search",
  });

  const { data: page } = useSearchRecommendations(requestType, search);

  const recommendations = page?.results || [{}, {}];

  return (
    <Box>
      <FormText
        control={control}
        name="search"
        placeholder="Search anything..."
        disabled={disabled}
      />

      <Zoom in={!disabled} mountOnEnter unmountOnExit>
        <List>
          {recommendations?.map((recommendation, index) =>
            recommendation?.id ? (
              <ListItem key={index}>
                <ListItemIcon>
                  <RequestType requestType={recommendation.requestType} />
                </ListItemIcon>
                <ListItemButton onClick={() => onSubmit(recommendation)}>
                  <ListItemText
                    primary={recommendation.field1}
                    secondary={`${recommendation.field2}`}
                  />
                  <RecommendationProvider provider={recommendation.provider} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key={index}>
                <ListItemIcon>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemIcon>
                <ListItemText
                  primary={<Skeleton variant="text" width="50%" height={50} />}
                  secondary={
                    <Skeleton variant="text" width="20%" height={20} />
                  }
                />
              </ListItem>
            )
          )}
          {recommendations?.length === 0 && (
            <ListItem>
              <ListItemText primary={t("noResults.long")} />
            </ListItem>
          )}
        </List>
      </Zoom>
    </Box>
  );
};
