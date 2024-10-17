import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

export const StoreItemDetails = ({
  icon,
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
        justifyContent="space-evenly"
        alignItems="center"
        px={5}
      >
        <Box display="flex" align="center" flexDirection="column">
          <Avatar
            src={icon}
            alt={name}
            sx={{
              width: 200,
              height: 200,
              border: "5px solid",
              borderColor: "secondary.main",
            }}
          />
          <Typography variant="h2">{label}</Typography>
        </Box>
        <Box display="flex" align="center" flexDirection="column">
          <Button variant="contained" color="primary" onClick={onBuy}>
            Buy for {price}
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography>{description}</Typography>
      </Box>
    </Stack>
  );
};
