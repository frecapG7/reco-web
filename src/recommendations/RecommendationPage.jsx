import { Container, Box, Typography, Stack, Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const RecommendationPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box display="flex" gap={2}>
        <Box flexGrow={3}>
          <Outlet />
        </Box>
        <Stack
          maxWidth={250}
          spacing={2}
          mt={5}
          display={{ xs: "none", lg: "flex" }}
        >
          <Typography variant="subtitle1">
            Les archives royales du royaume de roroco
          </Typography>
          <Divider />
          <Typography>{t("archives.description")}</Typography>
        </Stack>
      </Box>
    </Container>
  );
};
