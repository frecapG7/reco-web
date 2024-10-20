import { Grid, Skeleton, Typography } from "@mui/material";
import { RequestType } from "../../request/RequestType";
import { i18nDateTime } from "../../../utils/i18n";

export const LastRequests = ({ lastRequests = [], isLoading }) => {
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

  if (lastRequests.length === 0) {
    return (
      <Typography variant="body2" color="textSecondary">
        No requests yet.
      </Typography>
    );
  }

  return (
    <Grid container>
      {lastRequests.map((request) => (
        <Grid item container key={request.id} alignItems="center">
          <Grid item xs={1}>
            <RequestType requestType={request.requestType} />
          </Grid>
          <Grid item xs={11} md={6}>
            <Typography>{request.title}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{i18nDateTime(request.created)}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
