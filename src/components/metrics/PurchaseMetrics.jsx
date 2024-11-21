import { Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { i18nDate, i18nDateTime } from "../../utils/i18n";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";
import { MetricsItem } from "./MetricsItem";

export const PurchaseMetrics = ({ purchases }) => {
  if (!purchases) {
    return (
      <Grid container>
        <Grid
          size={{ xs: 6 }}
          sx={{
            border: 2,
            borderRadius: 5,
            borderColor: "primary.main",
            alignItems: "center",
            padding: 2,
            overflow: "hidden",
          }}
          container
        >
          <Stack>
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={80} height={20} />
          </Stack>
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{
            border: 2,
            borderRadius: 5,
            borderColor: "primary.main",
            alignItems: "center",
            padding: 3,
          }}
          container
        >
          <Stack>
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={80} height={20} />
          </Stack>
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{
            border: 2,
            borderRadius: 5,
            borderColor: "primary.main",
            alignItems: "center",
            padding: 3,
          }}
          container
        >
          <AccessTimeOutlinedIcon fontSize="large" />
          <Stack>
            <Skeleton variant="text" width={100} height={40} />
            <Skeleton variant="text" width={80} height={20} />
          </Stack>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} width="100%" alignItems="center">
      <Grid size={{ xs: 6 }}>
        <MetricsItem value={purchases.total} caption="Total purchases" />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <MetricsItem
          icon={<TollOutlinedIcon fontSize="large" color="currency" />}
          value={purchases.amount}
          caption="Total amount"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <MetricsItem
          icon={<AccessTimeOutlinedIcon fontSize="large" />}
          value={i18nDate(purchases.last?.date)}
          caption="Last purchase date"
        />
      </Grid>
    </Grid>
  );
};
