import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Paper,
  Skeleton,
  Typography,
  Zoom,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormSearch } from "../components/form/FormSearch";
import { FormToggles } from "../components/form/FormToggles";
import { RequestType } from "../components/request/RequestType";
import { useSearchRecommendations } from "../hooks/api/recommendations/recommendations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CollectionsIcon from "@mui/icons-material/Collections";
import { RecommendationProvider } from "../components/recommendation/RecommendationProvider";
import { useTranslation } from "react-i18next";
export const SearchRecommendations = () => {
  const { control } = useForm({
    defaultValues: {
      search: "",
      requestType: "",
    },
  });

  const data = useWatch({
    control,
  });

  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: page, isLoading } = useSearchRecommendations(
    data?.requestType,
    data?.search,
    25,
    pageNumber
  );

  const { t } = useTranslation();

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Button variant="contained" onClick={() => navigate("new")}>
          {t("archives.add")}
        </Button>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="title">Archives</Typography>
          <CollectionsIcon fontSize="large" />
        </Box>
      </Box>
      <Paper variant="brutalist1">
        <Box aria-label="search-recommendation-form">
          <FormToggles
            control={control}
            name="requestType"
            options={[
              {
                value: "BOOK",
                label: <RequestType requestType="BOOK" />,
              },
              {
                value: "SONG",
                label: <RequestType requestType="SONG" />,
              },
              {
                value: "MOVIE",
                label: <RequestType requestType="MOVIE" />,
              },
            ]}
            rules={{
              required: true,
            }}
            enforceValue
          />
          <FormSearch control={control} name="search" label="Search" />
        </Box>

        <Zoom in={isLoading} mountOnEnter unmountOnExit>
          <List>
            <ListItem
              secondaryAction={
                <Skeleton variant="circular" width={40} height={40} />
              }
            >
              <ListItemText
                primary={<Skeleton width="50%" />}
                secondary={<Skeleton width="25%" />}
              />
            </ListItem>
            <ListItem
              secondaryAction={
                <Skeleton variant="circular" width={40} height={40} />
              }
            >
              <ListItemText
                primary={<Skeleton width="50%" />}
                secondary={<Skeleton width="25%" />}
              />
            </ListItem>
          </List>
        </Zoom>

        <List>
          {page?.results?.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => navigate(`${recommendation.id}`)}>
                <ListItemIcon>
                  <RequestType requestType={recommendation.requestType} />
                </ListItemIcon>
                <ListItemText
                  primary={recommendation.field1}
                  secondary={recommendation.field2}
                />
                <RecommendationProvider provider={recommendation.provider} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Zoom in={page?.pagination?.totalPages > 0} mountOnEnter unmountOnExit>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Pagination
              count={page?.pagination?.totalPages}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Box>
        </Zoom>
      </Paper>
    </Box>
  );
};
