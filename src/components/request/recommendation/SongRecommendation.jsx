import { Grid, Slide } from "@mui/material";
import { IFramely } from "../IFramely";

export const SongRecommendation = ({ recommendation }) => {
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        {recommendation.field1}
      </Grid>
      <Grid item xs={12}>
        {recommendation.field2}
      </Grid> */}

      <Slide in={Boolean(recommendation.html)} direction="up">
        <Grid item xs={12}>
          <IFramely html={recommendation.html} />
        </Grid>
      </Slide>
    </Grid>
  );
};
