import { Box, Typography } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useGetLastRequests } from "../hooks/api/users/useUsers";
import { LastRequests } from "../components/user/requests/LastRequests";

export const UserLastRequest = ({ user }) => {
  const { data: lastRequests, isLoading } = useGetLastRequests(user.id, {
    enabled: user?.settings?.publicRequestHistory,
  });

  if (!user?.settings?.publicRequestHistory)
    return (
      <Box align="center">
        <LockOutlinedIcon color="primary.main" fontSize="large" />
        <Typography variant="caption" paragraph>
          This user has their request history set to private.
        </Typography>
      </Box>
    );

  return (
    <Box display="flex">
      <LastRequests LastRequests={lastRequests} />
    </Box>
  );
};
