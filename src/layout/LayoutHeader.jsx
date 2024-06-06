import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";

import { Logo } from "../components/utils/Logo";
import { useNavigate } from "react-router-dom";

export const LayoutHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const onLogoClick = () => {
    if (isUpSm) navigate("/");
    else toggleMenu();
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      gap={0}
      sx={{
        flexGrow: 1,
      }}
    >
      <IconButton onClick={onLogoClick}>
        <Logo width={50} />
      </IconButton>
      <Box>
        <Typography variant="h6">Rococo</Typography>
        <Typography variant="body2">Welcome to my app</Typography>
      </Box>
    </Box>
  );
};
