import {
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { UserName } from "../components/user/UserName";
import { Recommendations } from "./Recommendations";

import { RequestType } from "../components/request/RequestType";

export const RequestDetails = ({ request }) => {
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
        <Box>
          <UserName user={request.author} />
          <Typography variant="caption">{request.created}</Typography>
        </Box>

        <Box
          sx={{
            color: "primary.main",
            p: 5,
            border: 1,
          }}
          align="center"
        >
          <RequestType requestType={request.requestType} />
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          height: 250,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          justifyContent: "flex-space-between",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="title" textAlign="left" paragraph>
          {request.title}
        </Typography>
        <Typography variant="body1">{request.description}</Typography>

        <Grid container mt={2} spacing={3}>
          {request.tags.map((tag, index) => (
            <Grid item key={tag}>
              <Chip key={index} label={`# ${tag}`} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Paper
        sx={{
          // p: 5,
          bgcolor: "primary.dark",
        }}
      >
        <Recommendations request={request} />
      </Paper>
    </Stack>
  );
};
