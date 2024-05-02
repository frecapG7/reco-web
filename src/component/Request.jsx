import { Box, Stack, Typography } from "@mui/material";
import { Enum } from "../utils/Enum";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

const Status = ({ request }) => {
  if (request?.status === "CLOSED")
    return (
      <Box border="solid" borderRadius={1.5}>
        <Typography color="color">Closed</Typography>
      </Box>
    );

  return (
    <Box border={1} color="primary" borderRadius={1.5}>
      <Typography color="success" justifyContent="justify">
        <Enum value={request.duration} enumName="DURATION" />
      </Typography>
    </Box>
  );
};

export const Request = ({ request }) => {
  if (request)
    return (
      <Box>
        <Box justifyContent="space-between" display="flex">
          <Typography variant="title">
            You made a{" "}
            <Enum value={request.requestType} enumName="REQUEST_TYPE" /> request
          </Typography>
          <Status request={request} />
        </Box>
        <Stack spacing={2} ml={5} direction={{ md: "row" }}>
          <Typography variant="body2">
            Created {request?.created?.toLocaleString()} <AccessTimeIcon />
          </Typography>
          <Typography variant="body" paragraph alignItems="center">
            {request.recommendationsCount} <PersonIcon />
          </Typography>
        </Stack>
      </Box>
    );
};
