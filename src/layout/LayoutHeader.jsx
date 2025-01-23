import {
  Box,
  IconButton,
  Fade,
  Typography,
  useMediaQuery,
} from "@mui/material";

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
      <Box display="flex" alignItems="center">
        <IconButton onClick={onLogoClick}>
          <Logo width={50} />
        </IconButton>
        <Box>
          <Typography variant="h6">RawKauKo</Typography>
        </Box>
      </Box>

      <Fade in={session?.loggedIn} mountOnEnter unmountOnExit>
        <Box
          display="flex"
          flexDirection="row"
          gap={2}
          alignItems="center"
          aria-label="user-space"
          justifyContent="center"
        >
          <HeaderNotification />
          <HeaderAccount user={session.user} />
        </Box>
      </Fade>
    </Box>
  );
};
