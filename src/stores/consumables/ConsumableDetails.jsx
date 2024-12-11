import { Box, CircularProgress, Container, Zoom } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { StoreItemDetails } from "../../components/store/items/StoreItemDetails";
import { SuccessDialog } from "../../components/dialog/SuccessDialog";
import {
  useBuyConsumableItem,
  useGetConsumable,
} from "../../hooks/api/market/useConsumablesStore";

export const ConsumableDetails = () => {
  const { id } = useParams();
  const { data: consumableItem } = useGetConsumable(id);
  const buyItem = useBuyConsumableItem(id);

  const navigate = useNavigate();
  const handleBuy = (quantity) => {
    buyItem.mutate(quantity, {
      onSuccess: (data) =>
        setTimeout(() => {
          console.log(JSON.stringify(data, null, 2));
          navigate("/account/my-purchases");
        }, 300),
    });
  };

  return (
    <Container sx={{ my: 2 }}>
      <Zoom in={buyItem.isPending} unmountOnExit mountOnEnter>
        <Box align="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Box>
      </Zoom>
      <Zoom in={!buyItem.isPending} unmountOnExit mountOnEnter>
        <Box>
          <StoreItemDetails
            icon={consumableItem?.icon}
            type={consumableItem?.type}
            name={consumableItem?.name}
            label={consumableItem?.label}
            price={consumableItem?.price}
            description={consumableItem?.description}
            onBuy={handleBuy}
          />
        </Box>
      </Zoom>

      <SuccessDialog
        open={buyItem.isSuccess}
        message="Item successfully purchased!"
      />
    </Container>
  );
};
