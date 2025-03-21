import { Box } from "@mui/material";

export const Logo = ({ width = 150 }) => {
  return <Box component="img" src="/icon.png" sx={{ width }} alt="logo" />;
};
