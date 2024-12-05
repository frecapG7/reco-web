import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";

import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
export const IconItemList = ({ icons, onClick }) => {
  if (icons?.length == 0) {
    return (
      <Box aria-label="no-content" align="center">
        <Typography variant="h4">No results</Typography>
      </Box>
    );
  }

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
      {icons.map((item, index) => (
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
          <Box
            component="img"
            srcSet={item.url}
            src={item.url}
            alt={item.label}
            loading="lazy"
            sx={{
              maxHeight: "10em",
            }}
          />
          <ImageListItemBar
            title={item.label}
            subtitle={
              <>
                {item.price}
                <DiamondOutlinedIcon />
              </>
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
    // {hasShowMore && (
    //   <Grid item xs={12}>
    //     <Box align="center">
    //       <Button variant="contained" color="primary" onClick={onShowMore}>
    //         Show more
    //       </Button>
    //     </Box>
    //   </Grid>
    // )}
  );
};
