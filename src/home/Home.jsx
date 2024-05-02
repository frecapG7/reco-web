import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useGetRequests } from "../hooks/api/requests/useRequests";
import InfiniteScroll from "react-infinite-scroll-component";
import { Fragment } from "react";
import { RequestDetails } from "./RequestDetails";

export const Home = () => {
  const { data: results, isLoading, isError } = useGetRequests();

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          align="center"
          alignItems="center"
          sx={{
            my: 5,
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box aria-label="search-filters">TODO</Box>

      <Box sx={{ my: 5 }}>
        <InfiniteScroll
          dataLength={results?.total || 0}
          next={() => console.log("next")}
          hasMore={false}
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
          refreshFunction={() => console.log("refresh")}
        >
          {results?.results.map((result) => (
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
        </InfiniteScroll>
      </Box>
    </Container>
  );
};
