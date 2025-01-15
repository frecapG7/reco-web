import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../hooks/api/users/useUsers";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { FollowButton } from "../components/user/follows/FollowButton";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { i18nDateTime } from "../i18n/i18nDate";

export const User = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUser(id);
  const [tab, setTab] = useState("requests");
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  useEffect(() => {
    setTab(
      location.pathname.split("/").pop() === id
        ? ""
        : location.pathname.split("/").pop()
    );
  }, [location, id]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Stack spacing={2} my={2}>
        <Grid
          container
          size={{ xs: 12, md: 4 }}
          display="flex"
          justifyContent="space-between"
          px={5}
        >
          <Grid container alignItems="center">
            <Grid size={{ xs: 6 }}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={user?.avatar}
                alt={user?.name}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="h4">{user?.name}</Typography>
              <Box display="flex" alignItems="center" gap={0.2}>
                <AccessTimeOutlinedIcon fontSize="small" />
                <Typography variant="subtitle2" textAlign="center">
                  {i18nDateTime(user?.created)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <FollowButton user={user} />
          </Grid>
        </Grid>

        <Box
          aria-label="user-tabs"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={tab}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleTabChange}
          >
            <Tab label="Requests" value="" />
            <Tab label="Recommendations" value="recommendations" />
          </Tabs>
        </Box>

        <Zoom key={tab} in={!isLoading}>
          <Box aria-label="user-tabs-content">
            <Outlet
              context={{
                user: user,
              }}
            />
          </Box>
        </Zoom>
      </Stack>
    </Container>
  );
};
