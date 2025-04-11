import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { useGetMarketProduct } from "../hooks/api/market/useMarketProducts";
import { EnumIcon } from "../components/icons/EnumIcon";
import { STORE_ITEM_TYPE } from "../utils/enumUtils";
import { useTranslation } from "react-i18next";
import { useAuthSession } from "../context/AuthContext";
import { useCreatePurchase } from "../hooks/api/users/usePurchases";
import { toast } from "react-toastify";
import { CurrencyIcon } from "../components/icons/CurrencyIcon";
import { ProductItem } from "../components/store/items/ProductItem";

export const ProductDetails = () => {
  const navigate = useNavigate();

  const { name } = useParams();
  const { data: product } = useGetMarketProduct(name);

  const { t } = useTranslation();

  const { session } = useAuthSession();

  const createPurchase = useCreatePurchase(session?.user?.id);

  const handleBuy = async () => {
    createPurchase.mutateAsync({
      item: product,
      quantity: 1,
    });
    toast.success(t("purchase.createSuccess"));
  };

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => navigate("..")}>
            <ArrowBackIcon />
          </IconButton>
          {product ? (
            <Typography variant="title">{product?.label}</Typography>
          ) : (
            <Skeleton variant="text" width={100} />
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" variant="h6" color="diamond">
              {product?.price}
            </Typography>
            <DiamondOutlinedIcon color="diamond" fontSize="large" />
          </Box>
          {product ? (
            <Chip
              size="medium"
              color="primary"
              onClick={() => navigate(`/stores/icons`)}
              icon={<EnumIcon value={product?.type} values={STORE_ITEM_TYPE} />}
            />
          ) : (
            <Skeleton variant="circular" width={50} height={40} />
          )}
        </Box>
      </Box>
      <Paper variant="brutalist1">
        <ProductItem product={product} />
        <Box
          justifyContent="center"
          alignItems="center"
          p={2}
          display="flex"
          mt={5}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuy}
            endIcon={<CurrencyIcon color="info" />}
            loading={createPurchase.isPending}
          >
            {t("buy")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
