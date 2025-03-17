import {
  Avatar,
  Box,
  Container,
  Icon,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetRequest } from "../hooks/api/requests/useRequests";
import { EnumIcon } from "../components/icons/EnumIcon";
import { REQUEST_TYPE } from "../utils/enumUtils";
import useI18nTime from "../hooks/i18n/useI18nTime";

export const RequestDetailsPage = () => {
  const { id } = useParams();

  const { relativeTime } = useI18nTime();
  const navigate = useNavigate();
  const { data: request } = useGetRequest(id);

  if (!request)
    return (
      <Container>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Stack>
            <Box display="flex" alignItems="center" gap={2}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" width={100} />
            </Box>
            <Skeleton variant="text" width={250} />
          </Stack>
        </Box>
        <Paper variant="brutalist1">
          <Skeleton variant="rectangular" height={200} />
        </Paper>
      </Container>
    );

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={2}
        px={2}
      >
        <Stack>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            onClick={() => navigate(`/users/${request.author.name}`)}
            sx={{
              cursor: "pointer",
            }}
          >
            <Avatar src={request.author.avatar} alt={request.author.name} />
            <Typography
              fontWeight="bold"
              sx={{
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {request.author.name}
            </Typography>
            <Typography variant="caption">
              {relativeTime(request.created)}
            </Typography>
          </Box>
          <Typography variant="title">{request.title}</Typography>
        </Stack>

        <Box display="flex" alignItems="center" gap={1}>
          <Icon variant="contained">
            <EnumIcon
              value={request?.requestType}
              values={REQUEST_TYPE}
              fontSize="large"
            />
          </Icon>
        </Box>
      </Box>

      <Paper variant="brutalist1">
        <Outlet
          context={{
            request,
          }}
        />
      </Paper>
    </Container>
  );
};
