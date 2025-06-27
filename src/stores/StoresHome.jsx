import {
  Box,
  Button,
  Container,
  ImageList,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetMarketProducts } from "../hooks/api/market/useMarketProducts";
import { StoreItemList } from "../components/store/items/StoreItemList";
import { ProductsListItem } from "../components/store/items/ProductsListItem";
import { ProductCard } from "../components/store/items/ProductCard";

export const StoresHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: icons } = useGetMarketProducts(
    {
      type: "IconItem",
    },
    5,
    1
  );

  const { data: providers } = useGetMarketProducts(
    {
      type: "ProviderItem",
    },
    5,
    1
  );
  const { data: consumables } = useGetMarketProducts(
    {
      type: "ConsumableItem",
    },
    5,
    1
  );

  return (
    <Container>
      <Stack spacing={5}>
        <Paper
          aria-label="icon_items"
          variant="brutalist2"
          sx={{
            mb: 5,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography variant="title" gutterBottom textAlign="left">
                {t("stores.avatars.title")}
              </Typography>
              <Typography
                variant="subtitle"
                gutterBottom
                component="p"
                textAlign="right"
              >
                {t("stores.avatars.description")}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("./icons")}
            >
              {t("seeAll")}
            </Button>
          </Box>

          <ImageList
            cols={{ xs: 2, sm: 4, md: 5 }}
            gap={10}
            sx={{
              margin: "auto",
              display: "flex",
              overflowX: "hidden",
              flexWrap: "noWrap",
            }}
          >
            {icons?.results.map((item) => (
              <ProductsListItem
                item={item}
                key={item.id}
                onClick={() => navigate(`icons/${item.name}`)}
              />
            ))}
          </ImageList>

          <Box
            display="flex"
            gap={2}
            sx={{
              overflowX: "hidden",
            }}
          >
            {icons?.results.map((item) => (
              <ProductCard
                product={item}
                key={item.id}
                onClick={() => navigate(`icons/${item.name}`)}
              />
            ))}
          </Box>
        </Paper>

        <Paper variant="brutalist2">
          <h2>providers</h2>
          <ImageList>
            {providers?.results.map((item) => (
              <ProductsListItem
                item={item}
                key={item.id}
                onClick={() => navigate(`providers/${item.name}`)}
              />
            ))}
          </ImageList>
        </Paper>

        <Paper aria-label="category_items" variant="brutalist2">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" color="primary">
              {t("seeAll")}
            </Button>

            <Stack>
              <Typography variant="title" gutterBottom textAlign="right">
                {t("stores.consumables.title")}
              </Typography>
              <Typography textAlign="right" component="p">
                {t("stores.consumables.description")}
              </Typography>
            </Stack>
          </Box>
          <StoreItemList
            items={consumables?.results}
            onClick={(item) => navigate(`./consumables/${item.name}`)}
          />
        </Paper>
      </Stack>
    </Container>
  );
};
