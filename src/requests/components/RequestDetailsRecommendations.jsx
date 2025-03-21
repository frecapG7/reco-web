import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Card,
  CardHeader,
  CardMedia,
  Avatar,
} from "@mui/material";
import { useGetRecommendations } from "../../hooks/api/requests/useRecommendations";
import InfiniteScroll from "react-infinite-scroll-component";
import { IFramely } from "../../components/request/IFramely";
import { LikeRecommendation } from "../../components/recommendation/LikeRecommendation";
import useI18nTime from "../../hooks/i18n/useI18nTime";
import { useForm, useWatch } from "react-hook-form";
import { FormSort } from "../../components/form/FormSort";

export const RequestDetailsRecommendations = ({ request }) => {
  const { control } = useForm();
  const sort = useWatch({
    control,
    name: "sort",
    defaultValue: "likes",
  });

  const { relativeTime } = useI18nTime();

  const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
    useGetRecommendations(request.id, sort, 5);

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
        maxWidth={150}
      >
        <FormSort control={control} name="sort" />
      </Stack>

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
    </Stack>
  );
};
