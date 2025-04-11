import {
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { CurrencyIcon } from "../../icons/CurrencyIcon";

export const ProductsListItem = ({ item, onClick }) => {
  return (
    <ImageListItem key={`product-${item.id}`} onClick={() => onClick(item)}>
      {item.icon ? (
        <Box
          component="img"
          srcSet={item.icon}
          src={item.icon}
          alt={item.label}
          loading="lazy"
          sx={{
            maxHeight: "10em",
          }}
        />
      ) : (
        <Skeleton variant="rectangular" width="100%" height="10em" />
      )}
      <ImageListItemBar
        sx={{
          backgroundColor: "primary.dark",
          px: 2,
        }}
        title={
          item.label ? (
            <Typography fontWeight="bold">{item.label}</Typography>
          ) : (
            <Skeleton width="60%" />
          )
        }
        subtitle={
          item.price ? (
            <Chip color="info" label={item?.price} icon={<CurrencyIcon />} />
          ) : (
            <Skeleton width="30%" />
          )
        }
        position="below"
        actionPosition="right"
      />
    </ImageListItem>
  );
};
