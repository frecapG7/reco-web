import { Button, Divider, Stack, Typography } from "@mui/material";

export const PaymentDetails = ({ balance, price, onBuy }) => {
  return (
    <>
      <Stack alignItems="flex-end" spacing={2}>
        <Typography variant="h6">Your balance is: 1000</Typography>
        <Typography align="flex-end" color="error">
          - {price}
        </Typography>
        <Divider color="primary" flexItem />
        <Typography variant="h6" fontWeight="bold">
          Remaining balance: {balance - price}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={onBuy}
        sx={{
          mt: 5,
        }}
      >
        Buy
      </Button>
    </>
  );
};
