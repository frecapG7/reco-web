import { Alert, Button, Divider, Grid2 as Grid, Zoom } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormSelect } from "../../../components/form/FormSelect";
import { StoreItemForm } from "../../../components/store/items/StoreItemForm";
import { FormTipTapEditor } from "../../../components/form/FormTipTapEditor";
import { STORE_ITEM_TYPE } from "../../../utils/enumUtils";
export const CreateMarketItem = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  const type = useWatch({
    control,
    name: "type",
  });

  return (
    <Grid container width="100%">
      <Grid size={{ xs: 12 }}>
        <FormSelect
          control={control}
          options={Array.from(STORE_ITEM_TYPE, ([key, value]) => ({
            value: key,
            label: value.label,
          }))}
          name="type"
          required
        />
        <Alert severity="info">
          The created item will be available in the market
        </Alert>
      </Grid>

      <Zoom in={!!type}>
        <Grid container>
          <Divider flexItem />
          <StoreItemForm control={control} />
          <FormTipTapEditor control={control} name="description" />
          <Grid size={{ xs: 12 }} justifyContent="center" display="flex">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Zoom>
    </Grid>
  );
};
