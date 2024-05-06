import { Grid } from "@mui/material";

export const SongRecommendation = ({ recommendation }) => {
  return (
    <Grid container>
      <Grid item>{recommendation.field1}</Grid>
    </Grid>
  );
};
