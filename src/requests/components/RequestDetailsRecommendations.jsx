import {
  Box,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  Avatar,
} from "@mui/material";
import { useGetRecommendations } from "../../hooks/api/requests/useRecommendations";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SortMenu } from "../../components/search/SortMenu";
import { IFramely } from "../../components/request/IFramely";
import { LikeRecommendation } from "../../components/recommendation/LikeRecommendation";
import useI18nTime from "../../hooks/i18n/useI18nTime";

export const RequestDetailsRecommendations = ({ request }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const [sort, setSort] = useState("likes");

  const { relativeTime } = useI18nTime();

  const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
    useGetRecommendations(request.id, sort, 5);

  useEffect(() => {
    setAnchorEl(null);
  }, [sort]);

  if (isLoading) {
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );
  }

  const recommendations = data?.pages.flatMap((page) => page.results) || [];

  return (
    <Stack spacing={2}>
      <Stack
        aria-label="recommendations-filters"
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <Typography variant="label">Sort by</Typography>
        <SortMenu value={sort} onChange={setSort} />
      </Stack>

      <Divider />

      {/* <Box aria-label="recommendations-list"> */}
      <InfiniteScroll
        dataLength={50}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<CircularProgress />}
        refreshFunction={refetch}
      >
        <Stack spacing={2} mt={5} divider={<Divider />}>
          {recommendations.map((recommendation, index) => (
            <Card key={index} elevation={0}>
              <CardHeader
                avatar={<Avatar src={recommendation.user.avatar} />}
                title={recommendation?.user.name}
                subheader={relativeTime(recommendation?.created_at)}
                action={
                  <Box>
                    <LikeRecommendation recommendation={recommendation} />
                  </Box>
                }
              />
              <CardMedia>
                <IFramely html={recommendation.html} />
              </CardMedia>
            </Card>
          ))}
        </Stack>
      </InfiniteScroll>
      {/* </Box> */}

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => setSort("likes")}>Likes</MenuItem>
          <MenuItem onClick={() => setSort("created")}>Created</MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};
