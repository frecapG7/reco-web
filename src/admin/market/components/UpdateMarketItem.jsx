import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { StoreItemForm } from "../../../components/store/items/StoreItemForm";
import { useEffect } from "react";

export const UpdateMarketItem = ({ marketItem, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => reset(marketItem), [marketItem, reset]);

  return (
    <Box>
      <StoreItemForm control={control} />
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};
