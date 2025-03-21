import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid2 as Grid,
  Icon,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { EnumIcon } from "../icons/EnumIcon";
import { REQUEST_TYPE } from "../../utils/enumUtils";
import useI18nTime from "../../hooks/i18n/useI18nTime";

export const Request = ({ request }) => {
  const { relativeTime } = useI18nTime();
  if (!request)
    return (
      <Stack spacing={2}>
        <Box
          sx={{
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Stack>
    );
  return (
    <Stack spacing={2}>
      <Box
        sx={{
          // height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={2}
        >
          <Avatar
            src={request?.author.avatar}
            alt={request?.author.name}
            sx={{
              width: { xs: 50, sm: 100 },
              height: { xs: 50, sm: 100 },
            }}
          />
          <Stack>
            <Typography variant="title">{request?.author.name}</Typography>
            <Typography variant="subtitle">
              {relativeTime(request?.created)}
            </Typography>
          </Stack>
        </Box>

        <Icon variant="contained">
          <EnumIcon
            value={request?.requestType}
            values={REQUEST_TYPE}
            fontSize="large"
          />
        </Icon>
      </Box>

      <Divider />

      <Box
        sx={{
          // height: 300,
          justifyContent: "flex-space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="title" textAlign="justify">
          {request.title}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: request.description }} />

        <Grid container mt={2} spacing={3}>
          {request.tags.map((tag, index) => (
            <Grid key={tag}>
              <Chip key={index} label={`# ${tag}`} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};
