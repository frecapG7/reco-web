import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Icon,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { RequestType } from "./RequestType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecommendationDialog } from "../../home/RecommendationDialog";

const User = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMouseOver = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

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

        <Icon variant="contained">
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
