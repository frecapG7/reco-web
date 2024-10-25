import { Grid, IconButton } from "@mui/material";
import { FormText } from "../form/FormText";

export const PurchaseFilters = ({ control, setValue }) => {
  return (
    <form>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <FormText
            control={control}
            name="name"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setValue("name", "")}>x</IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
    </form>
  );
};
