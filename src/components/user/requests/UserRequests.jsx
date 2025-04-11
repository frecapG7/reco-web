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
} from "@mui/material";
import { useGetRequests } from "../../../hooks/api/users/useUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { RequestType } from "../../request/RequestType";
import { i18nDateTime } from "../../../i18n/i18nDate";
import { Logo } from "../../utils/Logo";
import { useForm, useWatch } from "react-hook-form";

import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import { SortRequest } from "../../request/SortRequest";
import { useState } from "react";

export const UserRequests = ({ user }) => {
  const [sorting, setSorting] = useState({
    sort: "created",
    order: "desc",
  });
  const { control } = useForm({
    defaultValues: {
      sort: "created",
      requestType: "",
    },
  });
  const requestType = useWatch({ control, name: "requestType" });

  const { data, hasNextPage, refetch } = useGetRequests(
    user?.id,
    10,
    {
      sort: sorting.sort,
      order: sorting.order,
      requestType: requestType,
    },
    {
      enabled: !!user,
    }
  );

  const navigate = useNavigate();
  const requests = data?.pages?.flatMap((page) => page.results);

  return (
    <Stack width="100%">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-start"
      >
        <SortRequest sorting={sorting} setSorting={setSorting} />
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
        <Stack
          spacing={1}
          divider={<Divider />}
          sx={{
            pl: { xs: 2, sm: 5 },
          }}
        >
          {requests?.map((request) => (
            <Card key={request.id} elevation={0}>
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
                  <div
                    dangerouslySetInnerHTML={{ __html: request.description }}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </InfiniteScroll>
    </Stack>
  );
};
