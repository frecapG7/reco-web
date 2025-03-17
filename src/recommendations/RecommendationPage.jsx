import {
  Container,
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Stack,
  Zoom,
  Divider,
} from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import CollectionsIcon from "@mui/icons-material/Collections";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

export const RecommendationPage = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const location = useLocation();

  const pathname = location.pathname?.split("/").pop();

  return (
    <Container>
      <Box display="flex" gap={2}>
        <Box flexGrow={3}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={1}
            my={2}
          >
            <Zoom in={pathname !== "archives"} mountOnEnter unmountOnExit>
              <IconButton
                sx={{
                  mb: 2,
                }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon />
              </IconButton>
            </Zoom>

            <Zoom in={pathname === "archives"} mountOnEnter unmountOnExit>
              <Button variant="contained" onClick={() => navigate("new")}>
                New Archive
              </Button>
            </Zoom>

            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="title">Archives</Typography>
              <CollectionsIcon fontSize="large" />
            </Box>
          </Box>
          <Paper variant="brutalist1">
            <Outlet />
          </Paper>
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
