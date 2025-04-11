import {
  Box,
  Chip,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
  Typography,
} from "@mui/material";

import { CurrencyIcon } from "../../icons/CurrencyIcon";
export const StoreItemList = ({ items = [], onClick }) => {
  const skeletonItems = Array.from(new Array(5)).map((_, index) => ({
    id: `skeleton-${index}`,
    label: "",
    img: "",
    price: 0,
  }));

  const renderItems = items.length === 0 ? skeletonItems : items;

  return (
    <ImageList
      cols={5}
      gap={6}
      sx={{
        width: "100%",
        scrollbarWidth: "none",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(120px, 1fr))!important",
          md: "repeat(auto-fill, minmax(180px, 1fr))!important",
        },
      }}
    >
      {renderItems.map((item, index) => (
        <ImageListItem
          key={index}
          sx={{
            cursor: "pointer",
            // flewWrap: "wrap",
            backgroundColor: "primary.main",
            borderRadius: 2,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => onClick(item)}
        >
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
                <Chip
                  color="info"
                  label={item?.price}
                  icon={<CurrencyIcon />}
                />
              ) : (
                <Skeleton width="30%" />
              )
            }
            position="below"
            actionPosition="right"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
