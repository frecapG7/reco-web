import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Zoom,
  Skeleton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { StoreItemDetails } from "../../components/store/items/StoreItemDetails";
import { SuccessDialog } from "../../components/dialog/SuccessDialog";
import {
  useBuyConsumableItem,
  useGetConsumable,
} from "../../hooks/api/market/useConsumablesStore";
import { PaymentDetails } from "../../components/store/payment/PaymentDetails";

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

  if (!consumableItem)
    return (
      <Container>
        <Box display="flex" gap={2}>
          <Box flex={1.5}>
            <Skeleton variant="rectangular">
              <StoreItemDetails />
            </Skeleton>
            <Skeleton variant="text" />
          </Box>
          <Box flex={1}>
            <Skeleton variant="rounded">
              <PaymentDetails />
            </Skeleton>
          </Box>
        </Box>
      </Container>
    );

  return (
    <Container>
      <Zoom in={buyItem.isPending} unmountOnExit mountOnEnter>
        <Box align="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Box>
      </Zoom>
      <Zoom in={!buyItem.isPending} unmountOnExit mountOnEnter>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="flex-start"
          gap={2}
        >
          <Box flex={1.5}>
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
          <Box flex={1}>
            <Paper variant="outlined">
              <PaymentDetails price={consumableItem.price} onBuy={handleBuy} />
            </Paper>
          </Box>
        </Box>
      </Zoom>

      <SuccessDialog
        open={buyItem.isSuccess}
        message="Item successfully purchased!"
      />
    </Container>
  );
};
