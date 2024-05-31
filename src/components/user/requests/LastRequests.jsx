import { Grid, Typography } from "@mui/material";
import { RequestType } from "../../request/RequestType";
import { i18nDateTime } from "../../../utils/i18n";

export const LastRequests = ({ LastRequests }) => {
  return (
    <Grid container>
      {LastRequests.map((request) => (
        <Grid item container key={request.id} alignItems="center">
          <Grid item xs={4}>
            <RequestType requestType={request.requestType} />
          </Grid>
          <Grid item xs={6}>
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
