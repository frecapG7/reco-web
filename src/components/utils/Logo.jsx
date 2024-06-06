import icon from "../../../public/icon.png";
import { Box } from "@mui/material";

export const Logo = ({ width = 150 }) => {
  return <Box component="img" src={icon} sx={{ width }} alt="logo" />;
};
