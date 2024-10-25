import { useGetUser } from "../hooks/api/users/useUsers";

import { useAuthSession } from "../context/AuthContext";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";
import { UserAvatar } from "../components/user/icons/UserAvatar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserStats } from "../components/user/statistics/UserStats";
import { UserSummary } from "../components/user/UserSummary";
export const AccountHome = () => {
  const { session } = useAuthSession();
  const { data: user, isLoading } = useGetUser(session?.user.id);

  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    navigate(tab);
  }, [tab, navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Stack spacing={2} my={2}>
        <Box aria-label="account-summary"></Box>
        <UserSummary user={user} />
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
            <Tab label="Account" value="" />
            <Tab label="Activity" value="my-activity" />
            <Tab label="Purchases" value="my-purchases" />
            <Tab label="Settings" value="settings" />
          </Tabs>
        </Box>
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
