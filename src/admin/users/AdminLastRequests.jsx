import { Box, CircularProgress } from "@mui/material";
import { useGetLastRequests } from "../../hooks/api/admin/useUserAdministration";

import { LastRequests } from "../../components/user/requests/LastRequests";

export const AdminLastRequests = ({ user }) => {
  const { data: lastRequests, isLoading } = useGetLastRequests(user.id);

  if (isLoading)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  return <LastRequests LastRequests={lastRequests} />;
};
