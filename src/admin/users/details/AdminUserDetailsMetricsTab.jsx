import { useOutletContext } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import { useGetMetrics } from "../../../hooks/api/users/useUsers";
import Grid from "@mui/material/Grid2";
import { TypePieChart } from "../../../components/metrics/TypePieCharts";

import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { i18nRelativeDate } from "../../../i18n/i18nTime";
import { PurchaseMetrics } from "../../../components/metrics/PurchaseMetrics";
import { MetricsItem } from "../../../components/metrics/MetricsItem";
import { FollowingList } from "../../../components/user/follows/FollowingList";

export const AdminUserDetailsMetricsTab = () => {
  const { user } = useOutletContext();

  const { data: metrics } = useGetMetrics(user?.id, {
    enabled: !!user,
  });

  return (
    <Grid container spacing={5} width="100%">
      <Grid container size={{ xs: 12, md: 8 }} spacing={2}>
        <Grid container aria-label="user-main-metrics-container">
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
        <Grid container aria-label="user-purchases-details-container">
          <Typography variant="h5">Purchases</Typography>
          <PurchaseMetrics purchases={metrics?.purchases} />
        </Grid>
      </Grid>

      <Grid
        size={{ xs: 12, md: 4 }}
        container
        aria-label="user-wallet-details-container"
      >
        <Stack spacing={2} width="100%">
          <>
            <Box display="flex" gap={2} alignItems="center"></Box>
            <List
              subheader={
                <ListSubheader
                  component="div"
                  sx={{
                    backgroundColor: "inherit",
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={2}
                  >
                    <WalletOutlinedIcon fontSize="large" />
                    <Typography variant="h6">156</Typography>
                  </Box>
                </ListSubheader>
              }
            >
              <ListItem>
                <ListItemText
                  primary="Current balance"
                  secondary="156 Piasse"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Next refill"
                  secondary={i18nRelativeDate(new Date("2024-12-01"))}
                />
              </ListItem>
            </List>
          </>

          <>
            <FollowingList user={user} />
          </>
        </Stack>
      </Grid>

      <Grid container size={{ xs: 12 }}>
        <Grid size={{ xs: 12 }}>
          <Typography>
            Welcome to the metrics tab. Here you can see the user's activity
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box align="center">
            <Typography variant="h6" textAlign="center">
              Requests
            </Typography>
            <TypePieChart
              books={metrics?.requests?.books}
              songs={metrics?.requests?.songs}
              movies={metrics?.requests?.movies}
              slotProps={{ legend: { hidden: true } }}
            />
          </Box>
        </Grid>
        <Grid>
          <Box align="center">
            <Typography variant="h6" textAlign="center">
              Recommendations
            </Typography>
            <TypePieChart
              books={metrics?.recommendations?.books}
              songs={metrics?.recommendations?.songs}
              movies={metrics?.recommendations?.movies}
              slotProps={{ legend: { hidden: true } }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
