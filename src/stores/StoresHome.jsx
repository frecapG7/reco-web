import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { HomeIconItemList } from "./home/HomeIconItemList";
import { HomeConsumableItemsList } from "./home/HomeConsumableItemsList";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useTranslation } from "react-i18next";

export const StoresHome = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box aria-label="header" mt={3}>
        <Typography variant="h1" gutterBottom>
          {t("stores.title")}
        </Typography>
        <StorefrontOutlinedIcon fontSize="large" />
        <Typography>{t("stores.description")}</Typography>
      </Box>
      <Divider flexItem />

      <Stack gap={5}>
        <Box aria-label="icon_items">
          <Typography variant="title" gutterBottom>
            {t("stores.avatars.title")}
          </Typography>
          <Typography variant="subtitle" gutterBottom component="p">
            {t("stores.avatars.description")}
          </Typography>
          <HomeIconItemList />
        </Box>

        <Box aria-label="category_items">
          <Typography variant="h4" gutterBottom>
            {t("stores.consumables.title")}
          </Typography>
          <Typography>{t("stores.consumables.description")}</Typography>
          <HomeConsumableItemsList />
        </Box>
      </Stack>
    </Container>
  );
};
