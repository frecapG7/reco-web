import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/api/users/useUsers";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { UserAvatar } from "../components/user/icons/UserAvatar";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserLastRequest } from "./UserLastRequest";
import { UserLastRecommendations } from "./UserLastRecommendations";

export const User = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUser(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Stack spacing={2} my={2}>
        <Box display="flex" justifyContent="space-around">
          <Box
            align="center"
            sx={{
              fontSize: "2rem",
              p: 5,
            }}
          >
            <UserAvatar avatar={user.avatar} name={user.name} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="h2">{user.title}</Typography>
          </Box>

          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              backgroundColor: "primary.main",
            }}
          >
            <Typography variant="h6">Stats</Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              gap={2}
            >
              <Stack>
                <Typography>{user.statistics.requestsCount}</Typography>
                <Typography variant="caption">Requests</Typography>
              </Stack>
              <Stack>
                <Typography>{user.statistics.recommendationsCount}</Typography>
                <Typography variant="caption">Recommendations</Typography>
              </Stack>
            </Box>
          </Paper>
        </Box>

        <Divider textAlign="left">
          <Typography variant="h6">Last request</Typography>
        </Divider>
        <Paper aria-label="user-last-request-container">
          <UserLastRequest user={user} />
        </Paper>

        <Divider textAlign="left">
          <Typography variant="h6">Last recommendations</Typography>
        </Divider>
        <Paper aria-label="user-last-recommendations-container">
          <UserLastRecommendations user={user} />
        </Paper>

        <Divider textAlign="left">
          <Typography variant="h6">Last purchases</Typography>
        </Divider>
        <Paper aria-label="user-purchases-container">
          {!user?.privacy?.showPurchaseHistory && (
            <Box align="center">
              <LockOutlinedIcon color="primary.main" fontSize="large" />
              <Typography variant="caption" paragraph>
                This user has their purchase history set to private.
              </Typography>
            </Box>
          )}
        </Paper>

        <Box>
          <Typography variant="h6">Balance: {user.balance}</Typography>
        </Box>
      </Stack>
    </Container>
  );
};
