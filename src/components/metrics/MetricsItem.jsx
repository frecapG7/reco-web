import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
export const MetricsItem = ({ icon, value, caption }) => {
  return (
    <Grid
      sx={{
        border: 2,
        borderRadius: 5,
        borderColor: "primary.main",
        alignItems: "center",
        padding: 3,
      }}
      container
    >
      {icon && (
        <Grid size={{ xs: 12, md: 2 }} display="flex">
          {icon}
        </Grid>
      )}
      <Grid size={{ xs: 12, md: 10 }}>
        <Stack>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {caption}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
