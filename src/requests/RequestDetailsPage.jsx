import {
  Avatar,
  Box,
  Container,
  Icon,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetRequest } from "../hooks/api/requests/useRequests";
import { EnumIcon } from "../components/icons/EnumIcon";
import { REQUEST_TYPE } from "../utils/enumUtils";
import useI18nTime from "../hooks/i18n/useI18nTime";
import { ArrowBack } from "@mui/icons-material";

export const RequestDetailsPage = () => {
  const { id } = useParams();

  const { relativeTime } = useI18nTime();
  const navigate = useNavigate();
  const { data: request } = useGetRequest(id);

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={2}
        px={2}
      >
        <Box display="flex" gap={1}>
          {isUpSm && (
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
          )}
          <Stack>
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              onClick={() => navigate(`/users/${request?.author.name}`)}
              sx={{
                cursor: "pointer",
              }}
            >
              {request ? (
                <Avatar src={request.author.avatar} alt={request.author.name} />
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )}
              {request ? (
                <>
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
                </>
              ) : (
                <Skeleton variant="text" width={150} />
              )}
            </Box>
            {request ? (
              <Typography variant="title">{request.title}</Typography>
            ) : (
              <Skeleton variant="text" width={150} />
            )}
          </Stack>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          {request ? (
            <Icon variant="contained">
              <EnumIcon
                value={request?.requestType}
                values={REQUEST_TYPE}
                fontSize="large"
              />
            </Icon>
          ) : (
            <Skeleton variant="circular" width={150} />
          )}
        </Box>
      </Box>

      {request && (
        <Paper variant="brutalist1">
          <Outlet
            context={{
              request: request,
            }}
          />
        </Paper>
      )}
    </Container>
  );
};
