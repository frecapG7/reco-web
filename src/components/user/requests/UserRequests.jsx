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
import { useState } from "react";
import { SortMenu } from "../../search/SortMenu";
import { RequestTypeMenu } from "../../search/RequestTypeMenu";
import { Logo } from "../../utils/Logo";

export const UserRequests = ({ user }) => {
  const [sort, setSort] = useState("likes_desc");
  const [requestType, setRequestType] = useState("");

  const { data, hasNextPage, refetch } = useGetRequests(
    user?.id,
    10,
    {
      sort,
      type: requestType,
    },
    {
      enabled: !!user,
    }
  );

  const navigate = useNavigate();
  const requests = data?.pages?.flatMap((page) => page.results);

  return (
    <Stack width="100%">
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="label"> Sort by </Typography>
        <SortMenu value={sort} onChange={(sort) => setSort(sort)} />

        <Divider orientation="vertical" />

        <RequestTypeMenu
          value={requestType}
          onChange={(type) => setRequestType(type)}
        />
      </Stack>

      <InfiniteScroll
        dataLength={50}
        next={() => {}}
        hasMore={hasNextPage}
        loader={<CircularProgress />}
        refreshFunction={refetch}
        endMessage={
          <Box align="center" mt={5} mx={10}>
            <Divider width="50%">
              <Logo width={60} />
            </Divider>
          </Box>
        }
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
                    <Avatar variant="contained">
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
