import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetItem } from "../../hooks/api/market/useMarket";
import { IconItemDetails } from "../components/IconItemDetails";

export const IconDetails = () => {
  const { id } = useParams();
  const { data: iconItem } = useGetItem(id);

  return (
    <Container sx={{ my: 5 }}>
      <IconItemDetails item={iconItem} />
    </Container>
  );
};
