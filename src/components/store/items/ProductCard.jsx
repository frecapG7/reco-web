import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { CurrencyIcon } from "../../icons/CurrencyIcon";

export const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 345 }}
      onClick={onClick}
    >
      <CardActionArea>
        <CardHeader
          title={product.name}
          action={<Chip label={product.price} icon={<CurrencyIcon />} />}
        />

        <CardMedia
          src={product.icon}
          component="img"
          sx={{
            maxWidth: 150,
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
