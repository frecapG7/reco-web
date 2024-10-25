import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useGetPurchase } from "../../hooks/api/users/useUsers";

import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";

export const PurchaseDetails = () => {
  const { id } = useParams();

  const { user } = useOutletContext();

  const { data, isLoading } = useGetPurchase(user.id, id);

  const navigate = useNavigate();

  if (isLoading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <Container>
      <Box aria-label="purchase-details-header">
        <Stack spacing={2} direction="row" alignItems="center">
          <IconButton onClick={() => navigate(-1)}>
            <ArrowLeftOutlinedIcon />
          </IconButton>
          <Typography>{data?.type}</Typography>
        </Stack>
      </Box>

      <Box aria-label="purchase-details-content">
        <Typography>{data?.description}</Typography>
        <Typography>{data?.payment_details.price}</Typography>
      </Box>
    </Container>
  );
};
