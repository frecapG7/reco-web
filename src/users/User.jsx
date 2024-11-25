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
import { useEffect, useState } from "react";

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
        <Box align="center">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src={user?.avatar}
            alt={user?.name}
          />
          <Typography variant="h4" fontWeight="bold">
            {user?.name}
          </Typography>
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
