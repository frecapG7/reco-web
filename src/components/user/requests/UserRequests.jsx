import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetRequests } from "../../../hooks/api/users/useUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { RequestType } from "../../request/RequestType";
import { i18nDateTime } from "../../../utils/i18n";

export const UserRequests = ({ user }) => {
  const { data, hasNextPage, refetch } = useGetRequests(
    user?.id,
    10,
    {},
    {
      enabled: !!user,
    }
  );

  const navigate = useNavigate();
  const requests = data?.pages?.flatMap((page) => page.results);

  return (
    <Stack width="100%">
      <Box></Box>

      <InfiniteScroll
        dataLength={50}
        next={() => {}}
        hasMore={hasNextPage}
        loader={<CircularProgress />}
        refreshFunction={refetch}
        endMessage={<Divider />}
      >
        <Stack spacing={3} divider={<Divider />}>
          {requests?.map((request, index) => (
            <Card
              key={index}
              elevation={0}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/requests/${request.id}`)}
              >
                <CardHeader
                  avatar={
                    <Avatar>
                      <RequestType requestType={request?.requestType} />
                    </Avatar>
                  }
                  title={request?.title}
                  subheader={i18nDateTime(request?.created)}
                  action={
                    <Paper variant="body1">
                      {request.recommendationsCount} Rococos
                    </Paper>
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    {request?.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </InfiniteScroll>
    </Stack>
  );
};
