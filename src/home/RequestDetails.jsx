import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Icon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { UserName } from "../components/user/UserName";
import { Recommendations } from "./Recommendations";

import { RequestType } from "../components/request/RequestType";
import { RecommendationDialog } from "./RecommendationDialog";
import { useState } from "react";

export const RequestDetails = ({ request }) => {
  const [openDialog, setOpenDialog] = useState(false);

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

        <Icon
          sx={{
            width: 100,
            height: 100,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            border: 5,

            color: "secondary.main",
            borderColor: "primary.main",
            // backgroundColor: "primary.dark",
          }}
        >
          <RequestType requestType={request.requestType} />
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
        <Typography variant="title" textAlign="justify" paragraph>
          {request.title}
        </Typography>
        <Typography variant="body1">{request.description}</Typography>

        <Grid container mt={2} spacing={3}>
          {request.tags.map((tag, index) => (
            <Grid item key={tag}>
              <Chip key={index} label={`# ${tag}`} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              Recommend
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper
        sx={{
          p: 0,
          // bgcolor: "primary.dark",
        }}
      >
        <Recommendations request={request} />
      </Paper>

      <RecommendationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        request={request}
      />
    </Stack>
  );
};
