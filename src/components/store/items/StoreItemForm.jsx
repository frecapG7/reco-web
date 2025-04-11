import { Stack } from "@mui/material";
import { FormText } from "../../../components/form/FormText";
import { FormPrice } from "../../../components/form/FormPrice";
import { useVerifyUniqueName } from "../../../hooks/api/admin/useMarketAdministration";

export const StoreItemForm = ({ control }) => {
  const verifyUniqueName = useVerifyUniqueName();

  return (
    <Stack width="100%" spacing={2}>
      <FormText
        control={control}
        name="name"
        label="Item name"
        rules={{
          required: true,
          validate: async (value) => {
            try {
              await verifyUniqueName.mutateAsync(value);
              return true;
            } catch (error) {
              return "Already used";
            }
          },
        }}
      />
      <FormText
        control={control}
        name="label"
        label="Item label"
        rules={{
          required: true,
        }}
      />
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
    </Stack>
  );
};
