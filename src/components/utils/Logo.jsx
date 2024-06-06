import icon from "../../../public/icon.png";
import { Box } from "@mui/material";

export const Logo = () => {
  return <Box component="img" src={icon} sx={{ width: 150 }} alt="logo" />;
};
