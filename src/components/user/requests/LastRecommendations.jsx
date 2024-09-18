import { Grid, Skeleton, Typography } from "@mui/material";
import { RequestType } from "../../request/RequestType";
import { i18nDate } from "../../../utils/i18n";

export const LastRecommendations = ({
  lastRecommendations = [],
  isLoading,
}) => {
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

  return (
    <Grid container>
      {lastRecommendations.map((recommendation) => (
        <Grid item container key={recommendation.id} alignItems="center">
          <Grid item xs={4}>
            <RequestType requestType="BOOK" />
          </Grid>
          <Grid item xs={4}>
            <Typography>Field 1</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>10 Likes</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{i18nDate(new Date())}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
