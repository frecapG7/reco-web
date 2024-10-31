import { Box, CircularProgress } from "@mui/material";
import { StoreItemDetails } from "../../components/store/StoreItemDetails";
import { useBuyIconItem } from "../../hooks/api/market/useIconsStore";

import { confirm } from "../../components/utils/ConfirmationDialog";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

export const IconItemDetails = ({ item }) => {
  const buyIcon = useBuyIconItem({ id: item?._id });

  const handleBuy = () => {
    confirm({
      description: `Buying ${item.label} will cost you ${item.price}.`,
    })
      .then(() => {
        buyIcon.mutate(
          {},
          {
            onSuccess: () => {
              alert("Item bought successfully!");
            },
          }
        );
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
      </Box>
    );

  return (
    <StoreItemDetails
      icon={item?.url}
      name={item?.name}
      label={item?.label}
      price={item?.price}
      description={item?.description}
      onBuy={handleBuy}
    />
  );
};
