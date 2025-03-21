import { Alert, Button, Divider, Box, Zoom } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormSelect } from "../../../components/form/FormSelect";
import { StoreItemForm } from "../../../components/store/items/StoreItemForm";
import { STORE_ITEM_TYPE } from "../../../utils/enumUtils";
export const CreateMarketItem = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm();

  const type = useWatch({
    control,
    name: "type",
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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

      <Zoom in={!!type}>
        <Box width="100%">
          <Divider flexItem />
          <StoreItemForm control={control} />
          <Box justifyContent="center" display="flex" mt={5}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Zoom>
    </Box>
  );
};
