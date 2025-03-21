import { Box, Typography } from "@mui/material";

import { StoreItemList } from "../../components/store/items/StoreItemList";
export const IconItemList = ({ icons, onClick }) => {
  if (icons?.length == 0) {
    return (
      <Box aria-label="no-content" align="center">
        <Typography variant="h4">No results</Typography>
      </Box>
    );
  }

  return (
    <StoreItemList
      items={icons?.map((icon) => ({
        id: icon.id,
        label: icon.label,
        img: icon.url,
        price: icon.price,
      }))}
      onClick={(onClick)}
    />
  );
};
