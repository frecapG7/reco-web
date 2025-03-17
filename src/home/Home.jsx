import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useGetRequests } from "../hooks/api/requests/useRequests";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Request } from "../components/request/Request";
import { Recommendations } from "./components/Recommendations";
import { useForm, useWatch } from "react-hook-form";
import { SearchRequestFilterForm } from "./components/SearchRequestFilterForm";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const { control } = useForm();
  const filters = useWatch({ control });

  const {
    data: results,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useGetRequests(filters);

  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Container>
      <Box
        aria-label="search-filters"
        sx={{
          px: 2,
          mb: 2,
        }}
      >
        <SearchRequestFilterForm control={control} />
      </Box>

      <Paper variant="brutalist1">
        <InfiniteScroll
          dataLength={50}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<CircularProgress />}
          endMessage={
            <Box align="center">
              <b>{t("thatIsAll")}</b>
            </Box>
          }
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <Typography variant="h3" textAlign="center">
              {t("pullDownToRefresh")}
            </Typography>
          }
          releaseToRefreshContent={
            <Typography variant="h3" textAlign="center">
              {t("releaseToRefresh")}
            </Typography>
          }
          refreshFunction={() => refetch()}
        >
          {results?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.results.map((result) => (
                <Card
                  key={result.id}
                  variant="brutalist2"
                  elevation={1}
                  sx={{
                    my: 5,
                    mx: 1,
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/requests/${result.id}`)}
                  >
                    <CardContent>
                      <Request request={result} />
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Recommendations request={result} />
                  </CardActions>
                </Card>
              ))}
            </Fragment>
          ))}
          {isLoading && (
            <Box align="center">
              <CircularProgress />
            </Box>
          )}
        </InfiniteScroll>
      </Paper>
    </Container>
  );
};
