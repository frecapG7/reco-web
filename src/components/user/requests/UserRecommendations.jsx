import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetRecommendations } from "../../../hooks/api/users/useUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { RequestType } from "../../request/RequestType";
import { i18nDateTime } from "../../../i18n/i18nDate";
import { IFramely } from "../../request/IFramely";
import { useState } from "react";
import { SortMenu } from "../../search/SortMenu";
import { RequestTypeMenu } from "../../search/RequestTypeMenu";
import { Logo } from "../../utils/Logo";

export const UserRecommendations = ({ user }) => {
  const [sort, setSort] = useState("likes");
  const [requestType, setRequestType] = useState("");

  const { data, hasNextPage, refetch } = useGetRecommendations(
    user?.id,
    10,
    {
      sort,
      type: requestType,
    },
    { enabled: !!user }
  );

  const recommendations = data?.pages?.flatMap((page) => page.results);

  return (
    <Stack width="100%">
      <Stack direction="row" spacing={1}>
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
          {recommendations?.map((recommendation, index) => (
            <Card key={index} elevation={0}>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar variant="contained">
                      <RequestType requestType={recommendation?.requestType} />
                    </Avatar>
                  }
                  title={recommendation?.displayName}
                  subheader={i18nDateTime(recommendation?.createdAt)}
                  action={<Paper>{recommendation?.likes} likes</Paper>}
                />

                <CardMedia>
                  <IFramely html={recommendation.html} />
                </CardMedia>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </InfiniteScroll>
    </Stack>
  );
};
