import { Stack } from "@mui/material";
import { FormText } from "../../../components/form/FormText";
import { FormPrice } from "../../../components/form/FormPrice";

export const StoreItemForm = ({ control }) => {
  return (
    <Stack width="100%" spacing={2}>
      <FormText control={control} name="name" label="Item name" required />
      <FormText control={control} name="label" label="Item label" required />
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
      <FormText
        control={control}
        label="Icon"
        name="icon"
        rules={{ required: true }}
      />
      <FormText
        control={control}
        name="description"
        label="Description"
        multiline
        rows={5}
      />
    </Stack>
  );
};
