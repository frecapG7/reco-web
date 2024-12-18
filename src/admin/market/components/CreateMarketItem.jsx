import { Alert, Button, Grid2 as Grid, Zoom } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormSelect } from "../../../components/form/FormSelect";
import { StoreItemForm } from "../../../components/store/items/StoreItemForm";
export const CreateMarketItem = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  const type = useWatch({
    control,
    name: "type",
  });

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <FormSelect
          control={control}
          options={[
            { value: "ICON", label: "Users' avatar icons" },
            { value: "CONSUMABLE", label: "Consumable items" },
          ]}
          name="type"
          required
        />
        <Alert severity="info">
          The created item will be available in the market
        </Alert>
      </Grid>

      <Zoom in={!!type}>
        <Grid size={{ xs: 12 }}>
          <StoreItemForm control={control} />
        </Grid>
      </Zoom>

      <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
