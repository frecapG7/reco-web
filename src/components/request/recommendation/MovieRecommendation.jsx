import { Grid } from "@mui/material";
import { FormText } from "../../form/FormText";

export const MovieRecommendation = ({ control }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <FormText control={control} name="field1" label="Title" />
      </Grid>

      <Grid item xs={12}>
        <FormText control={control} name="field2" label="Director" />
      </Grid>
    </Grid>
  );
};
