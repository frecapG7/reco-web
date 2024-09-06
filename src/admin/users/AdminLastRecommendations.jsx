import { Box, CircularProgress } from "@mui/material";
import { useGetLastRecommendations } from "../../hooks/api/admin/useUserAdministration";
import { LastRecommendations } from "../../components/user/requests/LastRecommendations";

export const AdminLastRecommendations = ({ user }) => {
  const { data: lastRecommendations, isLoading } = useGetLastRecommendations(
    user._id
  );

  if (isLoading)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  return <LastRecommendations LastRecommendations={lastRecommendations} />;
};
