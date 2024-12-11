import { Box, Paper, Stack, Typography } from "@mui/material";
import { PaymentDetails } from "../payment/PaymentDetails";

export const StoreItemDetails = ({
  icon,
  type,
  name,
  label,
  price,
  description,
  onBuy,
}) => {
  return (
    <Stack spacing={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{ xs: "column", md: "row" }}
        px={5}
        gap={2}
      >
        <Box display="flex" gap={1} alignItems="flex-end" flexDirection="row">
          <Box
            component="img"
            src={icon}
            alt={name}
            sx={{
              width: { xs: "10em", md: "25em" },
              height: { xs: "15em", md: "30em" },
              backgroundColor: "primary.main",
              borderRadius: 5,
              padding: 5,
            }}
            loading="lazy"
          />
          <Stack>
            <Typography variant="title">{label}</Typography>
            <Typography variant="subtitle">{type}</Typography>
          </Stack>
        </Box>
        <Paper
          aria-label="payment-details"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="column"
          sx={{
            p: 4,
            minWidth: { xs: "100%", md: "20em" },
          }}
        >
          <PaymentDetails
            price={price}
            onBuy={onBuy}
            hasQuantity={type === "ConsumableItem"}
          />
        </Paper>
      </Box>

      <Box>
        <Typography>{description}</Typography>
      </Box>
    </Stack>
  );
};
