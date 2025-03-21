import {
  Box,
  IconButton,
  Fade,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";

import { Logo } from "../components/utils/Logo";
import { useNavigate } from "react-router-dom";
import { useAuthSession } from "../context/AuthContext";
import { HeaderNotification } from "./header/HeaderNotification";
import { HeaderAccount } from "./header/HeaderAccount";
import { useTranslation } from "react-i18next";

export const LayoutHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { session } = useAuthSession();

  const { i18n } = useTranslation();

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

      <Box display="flex" gap={2} alignItems="center">
        <Fade in={session?.loggedIn} mountOnEnter unmountOnExit>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            aria-label="user-space"
            justifyContent="center"
          >
            <HeaderNotification />
            <HeaderAccount />
          </Box>
        </Fade>
        <Box>
          <Select
            id="locale"
            name="locale"
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            style={{
              background: "transparent",
            }}
          >
            <MenuItem value="en">en EN</MenuItem>
            <MenuItem value="fr">🇫🇷 FR</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
};
