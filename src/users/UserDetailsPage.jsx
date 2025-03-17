import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../hooks/api/users/useUsers";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import useI18nTime from "../hooks/i18n/useI18nTime";
import { UserMetrics } from "./details/UserMetrics";
import PersonIcon from "@mui/icons-material/Person";

export const UserDetailsPage = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUser(id);
  const [tab, setTab] = useState("requests");
  const navigate = useNavigate();
  const location = useLocation();

  const { formatDate } = useI18nTime();

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
        px={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{
              width: { xs: 50, sm: 100 },
              height: { xs: 50, sm: 100 },
            }}
          />
          <Box display="flex" alignItems="center" flexDirection="column">
            <Typography variant="title">{user.name}</Typography>
            <Box alignItems="center" display="flex" gap={1}>
              <PersonIcon />
              <Typography>{formatDate(user?.created)}</Typography>
            </Box>
          </Box>
        </Box>

        <Stack>
          <Button variant="outlined" color="primary">
            Follow
          </Button>
        </Stack>
      </Box>
      <Paper variant="brutalist1">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap-reverse"
          mb={5}
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant={tab === "" ? "contained" : "outlined"}
              onClick={() => navigate("")}
            >
              Requests
            </Button>
            <Button
              variant={tab === "recommendations" ? "contained" : "outlined"}
              onClick={() => navigate("./recommendations")}
            >
              Recommendations
            </Button>
          </Box>

          <Paper
            variant="brutalist2"
            elevation={5}
            sx={{
              minWidth: 300,
              py: 2,
            }}
          >
            <UserMetrics user={user} />
          </Paper>
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
      </Paper>
    </Container>
  );
};
