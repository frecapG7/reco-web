import { Grid } from "@mui/material";

export const MovieRecommendation = ({ recommendation }) => {
  return (
    <Grid container>
      <Grid item>{recommendation.field1}</Grid>
    </Grid>
  );
};
