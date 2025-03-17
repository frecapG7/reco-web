import { useGetUser } from "../hooks/api/users/useUsers";

import { useAuthSession } from "../context/AuthContext";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Fade,
  Stack,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { i18nDateTime } from "../i18n/i18nDate";

const tabs = ["my-metrics", "my-requests", "my-recommendations"];

export const AccountHome = () => {
  const { session } = useAuthSession();
  const { data: user, isLoading } = useGetUser(session?.user.id);

  const [tab, setTab] = useState("my-metrics");

  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (tabs.includes(tab)) navigate(`./${tab}`);
  }, [tab, navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Stack spacing={2} my={2}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          display="flex"
          justifyContent="space-around"
        >
          <Grid container alignItems="center">
            <Grid size={{ xs: 6 }}>
              <Avatar
                sx={{ width: "10rem", height: "10rem" }}
                src={user?.avatar}
                alt={user?.name}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <Typography variant="h4">{user?.name}</Typography>
              <Box display="flex" alignItems="center" gap={0.2}>
                <AccessTimeOutlinedIcon fontSize="small" />
                <Typography variant="subtitle2" textAlign="center">
                  {i18nDateTime(user?.created)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Fade in={tabs.includes(tab)}>
          <Box
            aria-label="account-tabs"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tabs
              value={tab}
              textColor="primary"
              indicatorColor="primary"
              onChange={handleTabChange}
            >
              <Tab label="Metrics" value="my-metrics" />
              <Tab label="Requests" value="my-requests" />
              <Tab label="Recommendations" value="my-recommendations" />
            </Tabs>
          </Box>
        </Fade>
        <Zoom key={tab} in>
          <Box aria-label="account-tabs-content">
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
