import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/api/users/useUsers";
import {
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { UserLastRequest } from "./UserLastRequest";
import { UserLastRecommendations } from "./UserLastRecommendations";
import { UserSummary } from "../components/user/UserSummary";

export const User = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUser(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Stack spacing={2} my={2}>
        <UserSummary user={user} />

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
      </Stack>
    </Container>
  );
};
