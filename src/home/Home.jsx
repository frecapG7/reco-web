import { Box, Container, Typography } from "@mui/material";

export const Home = () => {
  debugger;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box align="center">
        <Typography variant="title"> Home page </Typography>
      </Box>

      <Box>
        <Typography variant="body1">
          This is the home page. You can add more content here.
        </Typography>
      </Box>
    </Box>
  );
};
