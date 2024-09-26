import { Grid, Skeleton, Typography } from "@mui/material";

export const LastPurchases = ({ lastPurchases = [], isLoading }) => {
  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(2)].map((_, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (lastPurchases.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No purchases yet.
      </Typography>
    );
  }

  return (
    <Grid container>
      {lastPurchases.map((purchase) => (
        <Grid item container key={purchase.id} alignItems="center">
          <Grid item xs={4}>
            <Typography>{purchase.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{purchase.type}</Typography>
          </Grid>

          

        </Grid>
      ))}
    </Grid>
  );
};
