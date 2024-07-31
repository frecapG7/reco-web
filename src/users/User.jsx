import { useParams } from "react-router-dom";
import { useGetUser } from "../hooks/api/users/useUsers";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { UserAvatar } from "../components/user/icons/UserAvatar";

export const User = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUser(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          my: 5,
          p: 5,
          bgcolor: "primary.main",
        }}
      >
        <Box
          align="center"
          sx={{
            backgroundColor: "white",
            fontSize: "2rem",
            p: 5,
          }}
        >
          <UserAvatar avatar={user.avatar} name={user.name} />
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="h2">{user.title}</Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6">Balance: {user.balance}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};
