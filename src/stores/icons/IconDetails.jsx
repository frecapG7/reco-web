import { Container, Zoom, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useBuyIconItem,
  useGetIconItem,
} from "../../hooks/api/market/useIconsStore";
import { StoreItemDetails } from "../../components/store/items/StoreItemDetails";
import { SuccessDialog } from "../../components/dialog/SuccessDialog";

export const IconDetails = () => {
  const { id } = useParams();
  const { data: iconItem } = useGetIconItem(id, {
    enabled: !!id,
  });
  const buyItem = useBuyIconItem(id);

  const handleBuy = () => {};

  return (
    <Container sx={{ my: 2 }}>
      <Zoom in={buyItem.isPending} mountOnEnter unmountOnExit>
        <Box align="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Box>
      </Zoom>
      <Zoom in={!buyItem.isPending} mountOnEnter unmountOnExit>
        <Box>
          <StoreItemDetails
            icon={iconItem?.url}
            type={iconItem?.type}
            name={iconItem?.name}
            label={iconItem?.label}
            price={iconItem?.price}
            description={iconItem?.description}
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
