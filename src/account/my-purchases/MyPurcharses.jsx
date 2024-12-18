import { Container, Typography } from "@mui/material";
import { UserPurchases } from "../../components/user/purchases/UserPurchases";
import { useAuthSession } from "../../context/AuthContext";

export const MyPurchases = () => {
  const { session } = useAuthSession();
  return (
    <Container
      sx={{
        my: 4,
      }}
    >
      <Typography variant="h4">My Purchases</Typography>
      <UserPurchases user={session?.user} />
    </Container>
  );
};
