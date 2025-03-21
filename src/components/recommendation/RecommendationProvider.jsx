import { Box } from "@mui/material";
import { useMemo } from "react";

export const RecommendationProvider = ({ provider, ...props }) => {
  const logoUrl = useMemo(() => {
    switch (provider?.name?.toLowerCase()) {
      case "soundcloud":
        return "/providers/logo_soundcloud.png";
      case "spotify":
        return "/providers/spotify.png";
      case "youtube":
        return "/providers/youtube.png";
    }
  });

  return <Box component="img" src={logoUrl} alt={provider?.name} {...props} />;
};
