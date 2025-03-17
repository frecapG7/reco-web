import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGetMarketProducts } from "../hooks/api/market/useMarketProducts";
import { StoreItemList } from "../components/store/items/StoreItemList";

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
  const { data: consumables } = useGetMarketProducts(
    {
      type: "ConsumableItem",
    },
    5,
    1
  );

  return (
    <Container>
      <Box display="flex">
        <Box flexGrow={1}>
          <Box
            aria-label="header"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
            px={2}
          >
            <StorefrontOutlinedIcon fontSize="large" />
          </Box>

          <Paper variant="brutalist1">
            <Stack gap={5}>
              <Paper aria-label="icon_items" variant="brutalist2">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("./icons")}
                  >
                    See all
                  </Button>
                  <Stack>
                    <Typography variant="title" gutterBottom textAlign="right">
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
                </Box>
                <StoreItemList
                  items={icons?.results}
                  onClick={(item) => navigate(`icons/${item.name}`)}
                />
              </Paper>

              <Paper aria-label="category_items" variant="brutalist2">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Button variant="contained" color="primary">
                    See all
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
          </Paper>
        </Box>
        <Box maxWidth={250} display={{ xs: "none", lg: "flex" }} mt={5} px={2}>
          <Typography>{t("stores.description")}</Typography>
        </Box>
      </Box>
    </Container>
  );
};
