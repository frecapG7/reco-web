import { Container, Zoom, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBuyIconItem,
  useGetIconItem,
} from "../../hooks/api/market/useIconsStore";
import { StoreItemDetails } from "../../components/store/items/StoreItemDetails";
import { SuccessDialog } from "../../components/dialog/SuccessDialog";
import { PaymentDetails } from "../../components/store/payment/PaymentDetails";

export const IconDetails = () => {
  const { id } = useParams();
  const { data: iconItem } = useGetIconItem(id, {
    enabled: !!id,
  });
  const buyIcon = useBuyIconItem();

  const navigate = useNavigate();

  const handleBuy = () => {
    buyIcon.mutate(iconItem, {
      onSuccess: (data) => {
        setTimeout(() => navigate(`/account/my-purchases/${data.id}`), 2000);
      },
    });
  };

  return (
    <Container sx={{ my: 2 }}>
      <Zoom in={buyIcon.isPending} mountOnEnter unmountOnExit>
        <Box align="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Box>
      </Zoom>
      <Zoom in={!buyIcon.isPending} mountOnEnter unmountOnExit>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="flex-start"
          gap={2}
        >
          <Box flex={1.5}>
            <StoreItemDetails
              icon={iconItem?.icon}
              type={iconItem?.type}
              name={iconItem?.name}
              label={iconItem?.label}
              description={iconItem?.description}
            />
          </Box>

          <Box mt={5} flex={1}>
            <PaymentDetails price={iconItem?.price} onBuy={handleBuy} />
          </Box>
        </Box>
      </Zoom>

      <SuccessDialog
        open={buyIcon.isSuccess}
        message="Item successfully purchased!"
      />
    </Container>
  );
};
