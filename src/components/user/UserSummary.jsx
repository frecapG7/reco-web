import { Avatar, Badge, Box, Skeleton, Stack, Typography } from "@mui/material";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";

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
        color="secondary"
        overlap="rectangular"
        badgeContent={user?.statistics?.requestsCount}
        showZero
      >
        <SoupKitchenOutlinedIcon
          sx={{
            backgroundColor: "primary.main",
            padding: 1,
            fontSize: 60,
            borderRadius: "50%",
            // color: "primary.dark",
          }}
        />
      </Badge>
      <Badge
        color="secondary"
        badgeContent={user?.statistics?.recommendationsCount}
        showZero
      >
        <LocalBarIcon
          sx={{
            backgroundColor: "primary.main",
            padding: 1,
            fontSize: 60,
            borderRadius: "50%",
            // color: "primary.dark",
          }}
        />
      </Badge>
      <Badge color="secondary" badgeContent={user?.balance} showZero>
        <SavingsOutlinedIcon
          sx={{
            backgroundColor: "primary.main",
            padding: 1,
            fontSize: 60,
            borderRadius: "50%",
            // color: "primary.dark",
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
