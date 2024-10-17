import { Box, Button, Grid, Typography } from "@mui/material";
import { IconItemCard } from "./IconItemCard";

export const IconItemList = ({ icons, hasShowMore, onShowMore }) => {
  if (icons?.length == 0) {
    return (
      <Box aria-label="no-content" align="center">
        <Typography variant="h4">No results</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {icons?.map((item, index) => (
        <Grid key={index} item xs={12} sm={3}>
          <IconItemCard item={item} />
        </Grid>
      ))}

      {hasShowMore && (
        <Grid item xs={12}>
          <Box align="center">
            <Button variant="contained" color="primary" onClick={onShowMore}>
              Show more
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
