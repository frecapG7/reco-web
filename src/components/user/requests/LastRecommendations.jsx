import { Grid, Typography } from "@mui/material";
import { RequestType } from "../../request/RequestType";
import { i18nDate } from "../../../utils/i18n";

export const LastRecommendations = ({ LastRecommendations }) => {
  return (
    <Grid container>
      {LastRecommendations.map((recommendation) => (
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
