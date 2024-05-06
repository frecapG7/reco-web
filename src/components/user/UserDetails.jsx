import {
  Avatar,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useGetUser } from "../../hooks/api/users/useUsers";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import LoginIcon from "@mui/icons-material/Login";

export const UserDetails = ({ user }) => {
  const { data, isLoading } = useGetUser(user.id);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 50, height: 50 }}
        />
        <Typography>{data.name}</Typography>
      </Grid>

      <Grid
        item
        container
        justifyContent="space-around"
        sx={{
          backgroundColor: "lightgray",
          // p: 5,
        }}
      >
        <Stack direction="column" alignItems="center">
          <Typography>{data.balance}</Typography>
          <MonetizationOnRoundedIcon color="yellow" />
        </Stack>

        <Stack direction="column" alignItems="center">
          <Typography>{data.requestCount}</Typography>
          Requests
        </Stack>
        <Stack direction="column" alignItems="center">
          <Typography>{data.recommendationCount} </Typography>
          Recommendations
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Typography
          textAlign="left"
          sx={{
            alignItems: "center",
          }}
        >
          <LoginIcon fontSize="medium" />
          {data.created}
        </Typography>
      </Grid>
    </Grid>
  );
};
