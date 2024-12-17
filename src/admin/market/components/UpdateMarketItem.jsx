import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { StoreItemForm } from "../../../components/store/items/StoreItemForm";
import { useEffect } from "react";
import { useUpdateItem } from "../../../hooks/api/admin/useMarketAdministration";

export const UpdateMarketItem = ({ marketItem, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => reset(marketItem), [marketItem, reset]);

  return (
    <Box>
      <StoreItemForm control={control} />
      <Box align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
