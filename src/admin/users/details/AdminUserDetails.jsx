import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../../../hooks/api/users/useUsers";
import {
  Box,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  Zoom,
} from "@mui/material";

import { UserSummary } from "../../../components/user/UserSummary";
import { useEffect, useState } from "react";

export const AdminUserDetails = () => {
  const { id } = useParams();

  const { data: user, isError, isLoading, error } = useGetUser(id);

  const [tab, setTab] = useState("");

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
      <Stack spacing={2} my={2}>
        <UserSummary user={user} />

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
            <Tab label="Details" value="" />
            <Tab label="Activity" value="activity" />
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
