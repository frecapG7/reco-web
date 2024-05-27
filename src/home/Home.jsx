import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useGetRequests } from "../hooks/api/requests/useRequests";
import InfiniteScroll from "react-infinite-scroll-component";
import { RequestDetails } from "./RequestDetails";
import { Search } from "./Search";
import { Fragment, useState } from "react";

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

  return (
    <Container>
      <Box
        aria-label="search-filters"
        sx={{
          my: 5,
        }}
      >
        <Search filters={filters} setFilters={setFilters} />
      </Box>

      <Box sx={{ my: 5 }}>
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
                <Paper
                  key={result.id}
                  sx={{
                    my: 5,
                    border: `5px solid ${
                      result.status === "pending" ? "secondary.dark" : "green"
                    }`,
                  }}
                >
                  <RequestDetails request={result} />
                </Paper>
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
