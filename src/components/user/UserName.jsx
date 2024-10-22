import { Avatar, Box, Popover, Typography, Zoom } from "@mui/material";
import { useState } from "react";
import { UserDetails } from "./UserDetails";

export const UserName = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      sx={{
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{ width: 75, height: 75 }}
      />

      <Box>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="h2" paragraph>
          {user.title}
        </Typography>
      </Box>

      <Popover
        id="user-details"
        open={Boolean(anchorEl)}
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
        disableScrollLock
        transitionDuration={600}
        TransitionComponent={Zoom}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 5,
              backgroundColor: "primary.light",
            },
          },
        }}
      >
        <UserDetails user={user} />
      </Popover>
    </Box>
  );
};
