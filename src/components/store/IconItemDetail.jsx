import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

export const IconItemDetail = ({ iconItem, onBuy }) => {
  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <Box display="flex" align="center" flexDirection="column">
          <Avatar
            src={iconItem?.url}
            alt={iconItem?.name}
            sx={{
              width: 200,
              height: 200,
              border: "5px solid",
              borderColor: "secondary.main",
            }}
          />
          <Typography variant="h2">{iconItem?.label}</Typography>
        </Box>
        <Box display="flex" align="center" flexDirection="column">
          <Button variant="contained" color="primary" onClick={onBuy}>
            Buy for {iconItem?.price}
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography>{iconItem?.description}</Typography>
      </Box>
    </Stack>
  );
};
