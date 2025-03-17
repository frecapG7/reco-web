import { Box, Container, Typography, Paper } from "@mui/material";
import { UserPurchases } from "../../components/user/purchases/UserPurchases";
import { useAuthSession } from "../../context/AuthContext";

export const MyPurchases = () => {
  const { session } = useAuthSession();
  return (
    <Container>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="title">My Purchases</Typography>
      </Box>
      <Paper variant="brutalist1">
        <UserPurchases user={session?.user} />
      </Paper>
    </Container>
  );
};
