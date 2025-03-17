import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
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

export const ProductDetails = () => {
  const navigate = useNavigate();

  const { name } = useParams();
  const { data: product } = useGetMarketProduct(name);

  const { t } = useTranslation();
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { session } = useAuthSession();

  const createPurchase = useCreatePurchase(session?.user?.id);

  const handleBuy = async () => {
    createPurchase.mutateAsync({
      item: product,
      quantity: 1,
    });
    toast.success(t("purchase.createSuccess"));
  };

  if (!product)
    return (
      <Container>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton onClick={() => navigate("..")}>
            <ArrowBackIcon />
          </IconButton>

          <Box display="flex" alignItems="center" gap={2}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="circular" width={50} />
          </Box>
        </Box>
        <Paper variant="brutalist1">
          <Box display="flex" flexWrap="wrap">
            <Box
              sx={{
                backgroundColor: "primary.main",
                borderRadius: 2,
                padding: { xs: 4, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 250,
                flexGrow: 1,
              }}
            >
              <Skeleton variant="rectangular" width={200} height={200} />
              <Skeleton variant="text" width={200} />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={2}
              maxWidth={500}
            >
              <Skeleton variant="text" width={500} />
            </Box>
          </Box>
        </Paper>
      </Container>
    );

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <IconButton onClick={() => navigate("..")}>
            <ArrowBackIcon />
          </IconButton>
          {isUpSm && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuy}
              loading={createPurchase.isPending}
            >
              {t("buy")}
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight="bold" variant="h6" color="diamond">
              {product?.price}
            </Typography>
            <DiamondOutlinedIcon color="diamond" fontSize="large" />
          </Box>
          <Chip
            size="medium"
            color="primary"
            label="Avatar"
            icon={<EnumIcon value={product?.type} values={STORE_ITEM_TYPE} />}
          />

          <Typography variant="h1">{product?.label}</Typography>
        </Box>
      </Box>
      <Paper variant="brutalist1">
        <Box display="flex" flexWrap="wrap">
          <Box
            sx={{
              backgroundColor: "primary.main",
              borderRadius: 2,
              padding: { xs: 4, md: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 250,
              flexGrow: 1,
            }}
          >
            <Box
              component="img"
              src={product.icon}
              alt={product.name}
              loading="lazy"
              sx={{
                display: "flex",
                maxWidth: 200,
                //  width: { xs: "4em", md: "7.5em" },
              }}
            />
            <Typography variant="title" textAlign="center">
              {product.label}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={2}
            maxWidth={500}
          >
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Box>
        </Box>

        {!isUpSm && (
          <Box display="flex" justifyContent="center" p={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuy}
              fullWidth
              loading={createPurchase.isPending}
            >
              {t("buy")}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
