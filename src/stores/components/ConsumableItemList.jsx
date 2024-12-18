import { Box, Typography } from "@mui/material";

import { StoreItemList } from "../../components/store/items/StoreItemList";
export const ConsumableItemList = ({ consumables, onClick }) => {
  if (consumables?.length == 0) {
    return (
      <Box aria-label="no-content" align="center">
        <Typography variant="h4">No results</Typography>
      </Box>
    );
  }

  return (
    <StoreItemList
      items={consumables?.map((icon) => ({
        id: icon.id,
        label: icon.label,
        img: icon.icon,
        price: icon.price,
      }))}
      onClick={onClick}
    />
  );
};
