import { Avatar, CircularProgress, Grid, Typography } from "@mui/material";
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
      <Grid item xs={12}>
        <Typography alignItems="center">
          {data.balance} <MonetizationOnRoundedIcon color="yellow" />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <LoginIcon /> {data.created}
      </Grid>
    </Grid>
  );
};
