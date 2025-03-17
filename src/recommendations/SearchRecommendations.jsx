import {
  Box,
  Chip,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Skeleton,
  Zoom,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormSearch } from "../components/form/FormSearch";
import { FormToggles } from "../components/form/FormToggles";
import { RequestType } from "../components/request/RequestType";
import { useSearchRecommendations } from "../hooks/api/recommendations/recommendations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const SearchRecommendations = () => {
  const {
    control,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      requestType: "SONG",
      search: "",
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
    pageNumber,
    {
      enabled: isValid,
    }
  );

  return (
    <Container>
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
          <ListItem
            key={index}
            secondaryAction={
              <Chip
                label={recommendation.provider?.name}
                color={`${recommendation.provider?.name}`}
              />
            }
            sx={{
              pl: 0,
            }}
          >
            <ListItemButton onClick={() => navigate(`${recommendation.id}`)}>
              <ListItemText
                primary={recommendation.field1}
                secondary={recommendation.field2}
              />
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
    </Container>
  );
};
