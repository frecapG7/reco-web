import { useNavigate, useParams } from "react-router-dom";
import { useGetPurchase } from "../../../hooks/api/users/usePurchases";
import { PurchaseDetails } from "../../../components/purchase/PurchaseDetails";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const AdminUserDetailsPurchasesDetails = () => {
  const { id, purchaseId } = useParams();
  const { data: purchase } = useGetPurchase(id, purchaseId);

  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Button onClick={() => navigate(-1)} color="black">
          <ArrowBackIcon />
          Previous
        </Button>
      </Box>
      <PurchaseDetails purchase={purchase} />;
    </>
  );
};
