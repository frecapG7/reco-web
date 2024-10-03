import { useGetUser } from "../hooks/api/users/useUsers";

import { useAuthSession } from "../context/AuthContext";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { UserAvatar } from "../components/user/icons/UserAvatar";
export const AccountHome = () => {
  const { session } = useAuthSession();
  const { data: user, isLoading } = useGetUser(session?.user.id);

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
            <UserAvatar avatar={user.avatar} />
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="h2">{user.title}</Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
