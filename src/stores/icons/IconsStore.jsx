import { Box, Container, IconButton, Paper, Typography } from "@mui/material";

import { IconFilters } from "./components/IconFilters";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetMarketProducts } from "../../hooks/api/market/useMarketProducts";
import { StoreItemList } from "../../components/store/items/StoreItemList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const IconsStore = () => {
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const filters = useWatch({
    control,
  });

  const { data: icons } = useGetMarketProducts(
    { ...filters, type: "IconItem" },
    25,
    1
  );

  const navigate = useNavigate();

  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton onClick={() => navigate("..")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h1">Icons Store</Typography>
      </Box>
      <Paper variant="brutalist1">
        <Box aria-label="search">
          <IconFilters control={control} />
        </Box>

        <StoreItemList
          items={icons?.results}
          onClick={(item) => navigate(item.name)}
        />
      </Paper>
    </Container>
  );
};
