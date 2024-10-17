import { Box, Typography } from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useGetLastPurchases } from "../hooks/api/users/useUsers";
import { LastPurchases } from "../components/user/purchases/LastPurchases";

export const UserLastPurchases = ({ user }) => {
  const { data: lastPurchases, isLoading } = useGetLastPurchases(user.id, {
    enabled: user?.privacy?.showPurchases,
  });

  if (user?.privacy?.showPurchases)
    return (
      <Box align="center">
        <LockOutlinedIcon color="primary.main" fontSize="large" />
        <Typography variant="caption" paragraph>
          This user has their purchases history set to private.
        </Typography>
      </Box>
    );

  return (
    <Box display="flex">
      <LastPurchases lastPurchases={lastPurchases} isLoading={isLoading} />
    </Box>
  );
};
