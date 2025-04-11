import {
  Box,
  Container,
  IconButton,
  Paper,
  Icon,
  ImageList,
} from "@mui/material";

import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetMarketProducts } from "../../hooks/api/market/useMarketProducts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import { FormSearch } from "../../components/form/FormSearch";
import { ProductsListItem } from "../../components/store/items/ProductsListItem";

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box display="flex" gap={2}>
          <IconButton onClick={() => navigate("..")}>
            <ArrowBackIcon />
          </IconButton>
          <FormSearch control={control} name="search" label="Search" />
        </Box>

        <Icon variant="contained">
          <FaceRetouchingNaturalOutlinedIcon fontSize="large" />
        </Icon>
      </Box>
      <Paper variant="brutalist1">
        <ImageList
          variant="quilted"
          cols={{ xs: 2, sm: 4, md: 6 }}
          gap={10}
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {icons?.results.map((item) => (
            <ProductsListItem
              item={item}
              key={item.id}
              onClick={() => navigate(item.name)}
            />
          ))}
        </ImageList>
      </Paper>
    </Container>
  );
};
