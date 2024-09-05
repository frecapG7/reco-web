import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { HomeIconItemList } from "./home/HomeIconItemList";
import { HomeVariousItemList } from "./home/HomeVariousItemList";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

export const StoresHome = () => {
  return (
    <Container>
      <Box aria-label="header" mt={3}>
        <Typography variant="h1" gutterBottom>
          Welcome to the Marketplace!
        </Typography>
        <StorefrontOutlinedIcon fontSize="large" />

        <Typography paragraph>
          Explore our vast collection of items, from icons to titles, and
          discover the perfect pieces to express yourself. Whether you're
          looking for a new profile icon or a catchy title, we have something
          for everyone. Start browsing now and unleash your creativity!
        </Typography>
      </Box>

      <Stack gap={5}>
        <Paper aria-label="icon_items">
          <Typography variant="title" gutterBottom>
            Avatar
          </Typography>
          <Typography variant="subtitle" paragraph gutterBottom>
            Enjoy our coolest illustrations to make your profile stand out.
          </Typography>
          <HomeIconItemList />
        </Paper>

        {/* <Box aria-label="title_items">
          <Link to="titles">See all</Link>
          <Paper>
            <Typography variant="h4" gutterBottom>
              Title items
            </Typography>
            <Typography paragraph>
              Discover a wide range of titles to express yourself. From catchy
              phrases to inspirational quotes, find the perfect title that
              represents your mood and personality.
            </Typography>
          </Paper>
        </Box> */}

        <Box aria-label="category_items">
          <Typography variant="h4" gutterBottom>
            Various items
          </Typography>
          <HomeVariousItemList />
        </Box>
      </Stack>
    </Container>
  );
};