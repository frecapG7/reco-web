import { useParams } from "react-router-dom";
import { useGetUser } from "../../hooks/api/admin/useUserAdministration";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

import { i18nDate } from "../../utils/i18n";
import { UserBalance } from "../../components/user/icons/UserBalance";
import { UserRequests } from "../../components/user/icons/UserRequests";
import { UserRecommendations } from "../../components/user/icons/UserRecommendations";
import { UserAvatar } from "../../components/user/icons/UserAvatar";
import { CartDetail } from "./CartDetail";

export const UserDetails = () => {
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
          bgcolor: "primary.dark",
        }}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <UserAvatar avatar={user?.avatar} />

            <Box>
              <Typography variant="title">{user.name}</Typography>
              <Typography variant="subtitle1">{user.title}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              gap={2}
            ></Box>
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
            <UserRequests requests={10} />
            <UserRecommendations recommendations={5} />
            <UserBalance balance={user.balance} />
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
            <Typography>Created on {i18nDate(user?.created)}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider>Recent activity</Divider>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={1}>
                <Typography>Last requests</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Request 1" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Request 1" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Request 1" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={1}>
                <Typography>Last recommendations</Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Reco 1" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MenuBookOutlinedIcon color="primary" fontSize="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Reco 1" />
                  </ListItem>
                </List>
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
