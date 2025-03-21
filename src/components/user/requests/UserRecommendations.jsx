import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import { useGetRecommendations } from "../../../hooks/api/users/useUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { RequestType } from "../../request/RequestType";
import { IFramely } from "../../request/IFramely";
import { Logo } from "../../utils/Logo";
import { useForm, useWatch } from "react-hook-form";
import { FormSelectRequestType } from "../../form/FormSelectRequestType";
import { FormSelect } from "../../form/FormSelect";
import useI18nTime from "../../../hooks/i18n/useI18nTime";

import LocalBarIcon from "@mui/icons-material/LocalBar";

export const UserRecommendations = ({ user }) => {
  const { control } = useForm({
    defaultValues: {
      sort: "created",
      requestType: "",
    },
  });
  const filters = useWatch({ control });
  const { data, hasNextPage, refetch } = useGetRecommendations(
    user?.id,
    10,
    filters,
    { enabled: !!user }
  );

  const { formatDate } = useI18nTime();

  const recommendations = data?.pages?.flatMap((page) => page.results);

  return (
    <Stack width="100%">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
        display={{ xs: "none", sm: "flex" }}
        maxWidth={250}
      >
        <FormSelect
          control={control}
          name="sort"
          options={[
            {
              value: "likes",
              label: "Likes",
            },
            {
              value: "created",
              label: "Nouvelles",
            },
          ]}
        />

        <FormSelectRequestType control={control} name="requestType" />
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
                  title={`${recommendation?.field2} - ${recommendation?.field1}`}
                  subheader={formatDate(recommendation?.created_at)}
                  action={
                    <Chip
                      label={recommendation?.likesCount}
                      color="primary"
                      icon={<LocalBarIcon />}
                    />
                  }
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
