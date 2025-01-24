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
import { FormText } from "../../form/FormText";
import { useSearchRecommendations } from "../../../hooks/api/recommendations/recommendations";
import { useTranslation } from "react-i18next";
import { useEmbed } from "../../../hooks/api/embed/useEmbed";
import { useEffect } from "react";

export const RecommendationFormV2 = ({
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

  const { data: embed } = useEmbed(search, {
    enabled: search?.startsWith("https://") && search?.length > 10,
  });

  const recommendations = page?.results || [{}, {}];

  useEffect(() => {
    if (embed) {
      onSubmit({
        field1: embed.title,
        field2: embed.author,
        field3: embed.description,
        html: embed.html,
        url: embed.url,
        provider: embed.provider,
      });
    }
  }, [embed]);
  return (
    <Box>
      <FormText
        control={control}
        name="search"
        placeholder="Search anything or paste a link"
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
