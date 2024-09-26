import { Grid, Skeleton, Typography } from "@mui/material";
import { RequestType } from "../../request/RequestType";
import { i18nDate, i18nDateTime } from "../../../utils/i18n";

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

  if (lastRecommendations.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No recommendations yet.
      </Typography>
    );
  }

  return (
    <Grid container>
      {lastRecommendations.map((recommendation) => (
        <Grid item container key={recommendation.id} alignItems="center">
          <Grid item xs={1}>
            <RequestType requestType={recommendation.type} />
          </Grid>
          <Grid item xs={11} md={5}>
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {recommendation.field2} - {recommendation.field1}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography>10 Likes</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography>{i18nDateTime(recommendation.created_at)}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
