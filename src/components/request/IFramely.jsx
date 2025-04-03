import { Box } from "@mui/material";

export const IFramely = ({ html }) => {
  return (
    <Box
      component="iframe"
      src={html}
      width="100%"
      height="100%"
      frameborder="0"
      bgcolor="inherit"
    />
  );
};
