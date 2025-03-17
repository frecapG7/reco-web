import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useGetRequests } from "../../../hooks/api/users/useUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { RequestType } from "../../request/RequestType";
import { i18nDateTime } from "../../../i18n/i18nDate";
import { Logo } from "../../utils/Logo";
import { useForm, useWatch } from "react-hook-form";
import { FormSelectRequestType } from "../../form/FormSelectRequestType";
import { FormSelect } from "../../form/FormSelect";

import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";

export const UserRequests = ({ user }) => {
  const { control } = useForm({
    defaultValues: {
      sort: "created",
      requestType: "",
    },
  });
  const filters = useWatch({ control });

  const { data, hasNextPage, refetch } = useGetRequests(user?.id, 10, filters, {
    enabled: !!user,
  });

  const navigate = useNavigate();
  const requests = data?.pages?.flatMap((page) => page.results);

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
          {requests?.map((request, index) => (
            <Card key={index} elevation={0}>
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
                    <Chip
                      label={request.recommendationsCount}
                      color="primary"
                      icon={<LocalPizzaOutlinedIcon />}
                    />
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
