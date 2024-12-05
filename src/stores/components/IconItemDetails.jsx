import { Box, CircularProgress, Typography } from "@mui/material";
import { StoreItemDetails } from "../../components/store/StoreItemDetails";
import { useBuyIconItem } from "../../hooks/api/market/useIconsStore";

import { confirm } from "../../components/utils/ConfirmationDialog";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export const IconItemDetails = ({ item }) => {
  const buyIcon = useBuyIconItem();

  const handleBuy = () => {
    confirm({
      description: `Buying ${item.label} will cost you ${item.price}.`,
    })
      .then(() => {
        buyIcon.mutate(item._id, {
          onSuccess: () => {
            alert("Item bought successfully!");
          },
        });
      })
      .catch(() => {});
  };

  if (buyIcon.isPending)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  if (buyIcon.isSuccess)
    return (
      <Box align="center">
        <TaskAltOutlinedIcon color="success" fontSize="large" />
        <Typography variant="h4">Item bought successfully!</Typography>
      </Box>
    );

  return (
    <StoreItemDetails
      icon={item?.url}
      type={item?.type}
      name={item?.name}
      label={item?.label}
      price={item?.price}
      description={item?.description}
      onBuy={handleBuy}
    />
  );
};
