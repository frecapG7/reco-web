import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Icon,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { RequestType } from "./RequestType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSummary } from "../user/UserSummary";
import { useGetUser } from "../../hooks/api/users/useUsers";
import { RecommendationDialog } from "../../home/RecommendationDialog";

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
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{
          width: "7rem",
          height: "7rem",
        }}
      />
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

export const Request = ({ request }) => {
  const [openDialog, setOpenDialog] = useState(false);

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
          <RequestType requestType={request?.requestType} />
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
          <Grid item container xs={12} alignItems="center">
            <Typography>{request.recommendationsCount} Recocos</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDialog(true)}
            >
              + Add a Recoco
            </Button>
          </Grid>
        </Grid>
      </Box>

      <RecommendationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        request={request}
      />
    </Stack>
  );
};
