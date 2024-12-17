import { Grid2 as Grid } from "@mui/material";
import { FormText } from "../../../components/form/FormText";
import { FormPrice } from "../../../components/form/FormPrice";

export const StoreItemForm = ({ control }) => {
  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <FormText control={control} name="name" label="Item name" required />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormText control={control} name="label" label="Item label" required />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormPrice
          control={control}
          name="price"
          label="Price"
          rules={{
            required: true,
            min: 1,
            max: 100,
          }}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormText
          control={control}
          label="Icon"
          name="icon"
          rules={{ required: true }}
        />
      </Grid>
    </Grid>
  );
};
