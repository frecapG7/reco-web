import { Box, Typography } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useGetLastRecommendations } from "../hooks/api/users/useUsers";
import { LastRequests } from "../components/user/requests/LastRequests";
import { LastRecommendations } from "../components/user/requests/LastRecommendations";

export const UserLastRecommendations = ({ user }) => {
  const { data: lastRecommendations, isLoading } = useGetLastRecommendations(
    user.id,
    {
      enabled: user?.settings?.publicRecommendationsHistory,
    }
  );

  if (!user?.settings?.publicRequestHistory)
    return (
      <Box align="center">
        <LockOutlinedIcon color="primary.main" fontSize="large" />
        <Typography variant="caption" paragraph>
          This user has their recommendations history set to private.
        </Typography>
      </Box>
    );

  return (
    <Box display="flex">
      <LastRecommendations LastRecommendations={lastRecommendations} />
    </Box>
  );
};
