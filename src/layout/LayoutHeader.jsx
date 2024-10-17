import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";

import { Logo } from "../components/utils/Logo";
import { useNavigate } from "react-router-dom";
import { useAuthSession } from "../context/AuthContext";
import { HeaderNotification } from "./header/HeaderNotification";
import { HeaderAccount } from "./header/HeaderAccount";

export const LayoutHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { session } = useAuthSession();

  const onLogoClick = () => {
    if (isUpSm) navigate("/");
    else toggleMenu();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={0}
      sx={{
        flexGrow: 1,
      }}
    >
      <Box display="flex">
        <IconButton onClick={onLogoClick}>
          <Logo width={50} />
        </IconButton>
        <Box>
          <Typography variant="h6">Rococo</Typography>
          <Typography variant="body2">Welcome to my app</Typography>
        </Box>
      </Box>

      {session?.loggedIn && (
        <Box display="flex" gap={2} alignItems="center" aria-label="user-space">
          <HeaderNotification />
          <HeaderAccount />
        </Box>
      )}
    </Box>
  );
};
