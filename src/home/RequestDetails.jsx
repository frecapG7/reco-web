import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Icon,
  Paper,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { UserName } from "../components/user/UserName";
import { Recommendations } from "./Recommendations";

import { RequestType } from "../components/request/RequestType";
import { RecommendationDialog } from "./RecommendationDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSummary } from "../components/user/UserSummary";
import { useGetUser } from "../hooks/api/users/useUsers";

const User = ({ user }) => {
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const isMouseOver = Boolean(anchorEl);
  const openDetails = Boolean(anchorEl) && isUpSm;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const { data: details } = useGetUser(user.id, {
    enabled: openDetails,
  });

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={() => navigate(`/users/${user.id}`)}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Avatar src={user.avatar} alt={user.name} />
      <Typography
        sx={{
          ...(isMouseOver && { textDecoration: "underline" }),
        }}
      >
        {user.name}
      </Typography>

      <Popover
        id="user-details"
        open={openDetails}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        // disableScrollLock
        slotProps={{
          paper: {
            sx: {
              cursor: "pointer",
              padding: 2,
            },
          },
        }}
      >
        <UserSummary user={details} />
      </Popover>
    </Box>
  );
};

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
          <User user={request.author} />
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
