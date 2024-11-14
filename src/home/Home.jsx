import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetRequests } from "../hooks/api/requests/useRequests";
import InfiniteScroll from "react-infinite-scroll-component";
import { Search } from "./Search";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Request } from "../components/request/Request";
import { Recommendations } from "./Recommendations";

export const Home = () => {
  const [filters, setFilters] = useState({
    search: "",
  });

  const {
    data: results,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
  } = useGetRequests(filters);

  const navigate = useNavigate();

  return (
    <Container>
      <Paper
        aria-label="search-filters"
        sx={{
          mt: 5,
        }}
      >
        <Search filters={filters} setFilters={setFilters} />
      </Paper>

      <Box>
        <InfiniteScroll
          dataLength={50}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<CircularProgress />}
          endMessage={
            <Box align="center">
              <b>And that's it for today</b>
            </Box>
          }
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <Typography variant="h3" textAlign="center">
              Pull down to refresh
            </Typography>
          }
          releaseToRefreshContent={
            <Typography variant="h3" textAlign="center">
              Release to refresh
            </Typography>
          }
          refreshFunction={() => refetch()}
        >
          {results?.pages.map((page, i) => (
            <Fragment key={i}>
              {page.results.map((result) => (
                <Card
                  key={result.id}
                  sx={{
                    my: 5,
                    p: 0,
                  }}
                >
                  <CardActionArea
                    onClick={(e) => {
                      if (e.target.tagName === "BUTTON") {
                        e.preventDefault();
                        return;
                      }
                      navigate(`/requests/${result.id}`);
                    }}
                  >
                    <CardContent>
                      <Stack spacing={1}>
                        <Request request={result} />
                        <Recommendations request={result} />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
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
      </Box>
    </Container>
  );
};
