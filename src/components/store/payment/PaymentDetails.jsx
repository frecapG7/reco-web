import { Box, Button, Divider, IconButton, Typography } from "@mui/material";

import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { useState } from "react";
import { useAuthSession } from "../../../context/AuthContext";
import { useGetBalance } from "../../../hooks/api/users/useUsers";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export const PaymentDetails = ({ price = 0, hasQuantity, onBuy }) => {
  const { session } = useAuthSession();
  const { data } = useGetBalance(session?.user?.id, true, {
    enabled: !!session?.user?.id,
  });

  const [quantity, setQuantity] = useState(1);

  const balance = data?.balance || 0;
  const totalCost = price * quantity;
  const remainingBalance = balance - totalCost;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        <WalletOutlinedIcon
          fontSize="large"
          sx={{
            mr: 2,
          }}
        />
        <Typography variant="h5">{balance} </Typography>
        <DiamondOutlinedIcon variant="outlined" />
      </Box>
      <Divider color="primary" flexItem />

      {!hasQuantity && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
        >
          <Typography textAlign="end" variant="h6">
            Price :
          </Typography>
          <Typography textAlign="end" variant="h6" color="error">
            -{price}
          </Typography>
        </Box>
      )}
      {hasQuantity && (
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          spacing={5}
          aria-label="quantity-container"
          my={2}
        >
          <Box display="flex" alignItems="center" justifyContent="space-evenly">
            <IconButton
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            >
              <RemoveIcon />
            </IconButton>
            <Typography fontWeight="bold">{quantity}</Typography>
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <AddIcon />
            </IconButton>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            flexGrow={2}
            gap={1}
          >
            <Typography fontSize="medium">{price}</Typography>
            <Typography fontWeight="bold" fontSize="large">
              {price * quantity}
            </Typography>
          </Box>
        </Box>
      )}

      <Box display="flex" alignItems="center" justifyContent="flex-end" gap={1}>
        <Typography
          variant="title"
          fontWeight="bold"
          alignItems="center"
          textAlign="end"
          color={remainingBalance < 0 ? "error" : "success"}
        >
          {remainingBalance}
        </Typography>
        <DiamondOutlinedIcon
          fontSize="large"
          color={remainingBalance < 0 ? "error" : "success"}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => onBuy(quantity)}
        sx={{
          mt: 5,
        }}
        disabled={remainingBalance < 0}
      >
        Buy
      </Button>
    </>
  );
};
