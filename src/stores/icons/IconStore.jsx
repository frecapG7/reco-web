import { Box, Container, Grid } from "@mui/material";
import { useGetIconItems } from "../../hooks/api/market/useMarket";
import { IconItemCard } from "../../components/store/IconItemCard";

export const IconStore = () => {
  const { data } = useGetIconItems();

  return (
    <Container>
      <Box
        aria-label="search"
        sx={{
          my: 5,
        }}
      >
        <form>
          <input />
        </form>
      </Box>

      <Box aria-label="content">
        <Grid container spacing={4}>
          {data.results?.map((item, index) => (
            <Grid key={index} item xs={12} sm={3}>
              <IconItemCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
