import { Box, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPurchase } from "../../hooks/api/users/useUsers";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAuthSession } from "../../context/AuthContext";
import { PurchaseDetails } from "../../components/purchase/PurchaseDetails";

export const MyPurchasesDetails = () => {
  const { id } = useParams();

  const { session } = useAuthSession();

  const { data: purchase } = useGetPurchase(session?.user?.id, id, {
    enabled: !!session,
  });

  const navigate = useNavigate();

  return (
    <Container
      sx={{
        my: 5,
      }}
    >
      <Box>
        <Button onClick={() => navigate(-1)} color="black">
          <ArrowBackIcon />
          Previous
        </Button>
      </Box>
      <PurchaseDetails purchase={purchase} />
    </Container>
  );
};
