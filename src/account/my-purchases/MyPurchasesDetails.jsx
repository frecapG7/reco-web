import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPurchase,
  useRedeemPurchase,
} from "../../hooks/api/users/usePurchases";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";

import { useAuthSession } from "../../context/AuthContext";
import { PurchaseDetails } from "../../components/purchase/PurchaseDetails";
import { useTranslation } from "react-i18next";

export const MyPurchasesDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { session } = useAuthSession();

  const { data: purchase } = useGetPurchase(session?.user?.id, id, {
    enabled: !!session,
  });

  const redeem = useRedeemPurchase(session?.user?.id, id);

  const handleRedeem = async () => {
    await redeem.mutateAsync();
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
          <LocalDiningOutlinedIcon />
          <Typography variant="title">{purchase?.name}</Typography>
        </Box>
      </Box>
      <Paper variant="brutalist1">
        <PurchaseDetails purchase={purchase} />

        <Box
          display="flex"
          justifyContent="center"
          px={{ xs: 2, sm: 10 }}
          mt={5}
        >
          <Button
            fullWidth
            loading={redeem.isPending}
            variant="contained"
            onClick={handleRedeem}
          >
            {t("purchase.redeem")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
