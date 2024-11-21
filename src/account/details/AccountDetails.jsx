import { useOutletContext } from "react-router-dom";
import { useGetMetrics } from "../../hooks/api/users/useUsers";
import Grid from "@mui/material/Grid2";
import { MetricsItem } from "../../components/metrics/MetricsItem";

import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Typography } from "@mui/material";
import { PurchaseMetrics } from "../../components/metrics/PurchaseMetrics";

export const AccountDetails = () => {
  const { user } = useOutletContext();

  const { data: metrics } = useGetMetrics(user?.id, {
    enabled: !!user,
  });

  return (
    <Grid container spacing={5} width="100%">
      <Grid
        container
        size={{ xs: 12, md: 8 }}
        spacing={2}
        aria-label="user-main-metrics-container"
      >
        <Grid size={{ xs: 6 }}>
          <MetricsItem
            icon={<LocalFireDepartmentOutlinedIcon fontSize="large" />}
            value={metrics?.requests.total}
            caption="Requests"
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <MetricsItem
            icon={<SendOutlinedIcon fontSize="large" />}
            value={metrics?.recommendations.total}
            caption="Recommendations"
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <MetricsItem
            icon={<LocalPizzaOutlinedIcon fontSize="large" />}
            value={metrics?.likes.recommendationsLikedCount}
            caption="Recommendations you like"
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <MetricsItem
            icon={<InterestsOutlinedIcon fontSize="large" />}
            value={metrics?.likes.totalLikes}
            caption="Total Likes"
          />
        </Grid>
      </Grid>

      <Grid
        container
        size={{ xs: 12, md: 8 }}
        aria-label="user-purchases-details-container"
      >
        <Typography variant="h5">Purchases</Typography>
        <PurchaseMetrics purchases={metrics?.purchases} />
      </Grid>
    </Grid>
  );
};
