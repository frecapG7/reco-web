import { useParams } from "react-router-dom";
import { useGetUser } from "../../hooks/api/admin/useUserAdministration";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { i18nDate } from "../../utils/i18n";
import { UserBalance } from "../../components/user/icons/UserBalance";
import { UserRequests } from "../../components/user/icons/UserRequests";
import { UserRecommendations } from "../../components/user/icons/UserRecommendations";
import { UserAvatar } from "../../components/user/icons/UserAvatar";
import { CartDetail } from "./CartDetail";
import { AdminLastRequests } from "./AdminLastRequests";
import { AdminLastRecommendations } from "./AdminLastRecommendations";

export const AdminUserDetails = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError, error } = useGetUser(id);

  if (isLoading)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box align="center">
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{
          my: 5,
          p: 5,
          bgcolor: "primary.main",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid
            item
            container
            xs={12}
            md={5}
            justifyContent="center"
            alignItems="center"
            sx={{
              // display: "flex",
              backgroundColor: "primary.light",
              borderRadius: 5,
              padding: 5,
              margin: 2,
            }}
          >
            <Grid item container xs={12} md={4} display="flex">
              <Box align="center">
                <UserAvatar avatar={user?.avatar} />
              </Box>
            </Grid>
            <Grid item container xs={12} md={8} display="flex">
              <Typography variant="subtitle" paragraph>
                {user.name}
              </Typography>
              <Typography variant="title">{user.title}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "primary.light",
              borderRadius: 5,
              padding: 5,
            }}
          >
            <UserRequests requests={user.stats.requestsCount} />
            <UserRecommendations
              recommendations={user.stats.recommendationsCount}
            />
            <UserBalance balance={user.stats.balance} />
          </Grid>

          <Grid
            item
            container
            aria-label="boring-informations"
            sx={
              {
                // marginTop: 50,
              }
            }
          >
            <Grid item xs={12}>
              <Typography>Created on {i18nDate(user?.created)}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider>Recent activity</Divider>
          </Grid>

          <Grid item container alignItems="stretch" spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                flexGrow: 1,
              }}
            >
              <Paper elevation={1}>
                <Typography>Last requests</Typography>
                <AdminLastRequests user={user} />
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                flexGrow: 1,
              }}
            >
              <Paper elevation={1}>
                <Typography>Last recommendations</Typography>
                <AdminLastRecommendations user={user} />
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <CartDetail user={user} />
          </Grid>

          <Grid item xs={12}>
            <Divider>Admin</Divider>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
