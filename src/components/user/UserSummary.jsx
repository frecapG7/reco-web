import { Avatar, Badge, Box, Skeleton, Stack, Typography } from "@mui/material";

import LocalPostOfficeTwoToneIcon from "@mui/icons-material/LocalPostOfficeTwoTone";
import LocalBarTwoToneIcon from "@mui/icons-material/LocalBarTwoTone";
import SavingsTwoToneIcon from "@mui/icons-material/SavingsTwoTone";

const Metrics = ({ user }) => {
  return (
    <Box
      aria-label="user-stats"
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      gap={5}
      variant="contained"
      sx={{
        // backgroundColor: "primary.main",
        borderRadius: 5,
        padding: 5,
      }}
    >
      <Badge
        color="yellow"
        overlap="rectangular"
        badgeContent={user?.statistics?.requestsCount}
        showZero
        sx={{
          fontSize: 20,
        }}
      >
        <LocalPostOfficeTwoToneIcon
          sx={{
            // backgroundColor: "secondary.main",
            fontSize: 50,
            borderRadius: "50%",
          }}
        />
      </Badge>
      <Badge
        color="yellow"
        badgeContent={user?.statistics?.recommendationsCount}
        sx={{
          fontSize: 20,
        }}
        showZero
      >
        <LocalBarTwoToneIcon
          // color="yellow"
          sx={{
            // backgroundColor: "secondary.main",
            fontSize: 50,
            borderRadius: "50%",
          }}
        />
      </Badge>
      <Badge
        color="yellow"
        badgeContent={user?.balance}
        sx={{
          fontSize: 20,
        }}
        showZero
      >
        <SavingsTwoToneIcon
          // color="white"
          sx={{
            // backgroundColor: "secondary.main",
            fontSize: 50,
            borderRadius: "50%",
          }}
        />
      </Badge>
    </Box>
  );
};

export const UserSummary = ({ user }) => {
  if (!user)
    return (
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        aria-label="user-avatar"
      >
        <Box align="center">
          <Skeleton animation="wave" variant="circular">
            <Avatar />
          </Skeleton>
          <Skeleton variant="text" animation="wave" />
        </Box>

        <Metrics />
      </Box>
    );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        aria-label="user-avatar"
      >
        <Stack alignItems="center">
          <Avatar src={user.avatar} />
          <Typography variant="title">{user.name}</Typography>
        </Stack>
        <Metrics user={user} />
      </Box>
    </>
  );
};
