import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../../../hooks/api/admin/useUserAdministration";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useEffect, useState } from "react";
import { i18nDateTime } from "../../../i18n/i18nDate";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export const AdminUserDetails = () => {
  const { id } = useParams();

  const { data: user, isError, isLoading, error } = useGetUser(id);

  const [tab, setTab] = useState("");

  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  useEffect(() => {
    if (tab) {
      navigate(`./${tab}`);
    }
  }, [tab, navigate]);

  if (isError)
    return (
      <Box align="center">
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
      </Box>
    );

  return (
    <Container>
      <Stack spacing={2} my={2} width="100%">
        {/* <UserSummary user={user} /> */}

        <Box
          aria-label="user-summary"
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            marginBottom: 2,
            padding: 2,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Avatar
                sx={{ width: "10rem", height: "10rem" }}
                src={user?.avatar}
                alt={user?.name}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4">{user?.name}</Typography>
              <Typography variant="subtitle1">{user?.email}</Typography>
              <Typography variant="subtitle1">{user?.role}</Typography>
              <Box display="flex" alignItems="center" gap={0.2}>
                <AccessTimeOutlinedIcon fontSize="small" />
                <Typography variant="subtitle2" textAlign="center">
                  {i18nDateTime(user?.created)}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Stack spacing={2}>
            <Button variant="contained">Edit</Button>
            <Button variant="outlined">Suspend</Button>
          </Stack>
        </Box>

        <Box
          aria-label="user-tabs"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tabs
            value={tab}
            textColor="primary"
            indicatorColor="primary"
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Metrics" value="" />
            <Tab label="Requests" value="requests" />
            <Tab label="Recommendations" value="recommendations" />
            <Tab label="Purchases" value="purchases" />
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
