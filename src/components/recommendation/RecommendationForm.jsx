import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Skeleton,
  Zoom,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormText } from "../form/FormText";
import { useSearchRecommendations } from "../../hooks/api/recommendations/recommendations";
import { useTranslation } from "react-i18next";

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
                <ListItemButton onClick={() => onSubmit(recommendation)}>
                  <ListItemText
                    primary={recommendation.field1}
                    secondary={`${recommendation.field2} - ${recommendation.provider.name}`}
                  />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key={index}>
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
