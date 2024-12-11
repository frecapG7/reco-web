import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from "@mui/material";

import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
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
      gap={8}
      sx={{
        width: "100%",
        scrollbarWidth: "none",
        gridTemplateColumns: {
          xs: "repeat(auto-fill, minmax(130px, 1fr))!important",
          md: "repeat(auto-fill, minmax(180px, 1fr))!important",
        },
      }}
    >
      {renderItems.map((item, index) => (
        <ImageListItem
          key={index}
          sx={{
            cursor: "pointer",
            padding: 2,
            flewWrap: "wrap",
            "&:hover": {
              borderRadius: 5,
              transform: "scale(1.05)",
              backgroundColor: "primary.light",
            },
          }}
          onClick={() => onClick(item)}
        >
          {item.img ? (
            <Box
              component="img"
              srcSet={item.img}
              src={item.img}
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
            title={item.label || <Skeleton width="60%" />}
            subtitle={
              item.price ? (
                <>
                  {item.price}
                  <DiamondOutlinedIcon />
                </>
              ) : (
                <Skeleton width="40%" />
              )
            }
            position="below"
            actionPosition="right"
            actionIcon={
              <IconButton
                onClick={() => onClick(item)}
                variant="contained"
                size="small"
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
