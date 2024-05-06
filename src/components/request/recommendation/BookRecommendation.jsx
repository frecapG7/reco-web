import { Box, Grid, Icon, Stack, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export const BookRecommendation = ({ recommendation }) => {
  return (
    <Stack spacing={2}>
      <Grid item>{recommendation.field1}</Grid>
      <Box display="flex" alignItems="center" gap={3}>
        <Icon>
          <PersonOutlineOutlinedIcon color="primary" fontSize="medium" />
        </Icon>
        <Typography>{recommendation.field2}</Typography>
      </Box>
      <Grid item>{recommendation.field3}</Grid>
    </Stack>
  );
};
