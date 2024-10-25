import { useGetLastRequests } from "../../hooks/api/admin/useUserAdministration";

import { LastRequests } from "../../components/user/requests/LastRequests";
import { Box } from "@mui/material";

export const AdminLastRequests = ({ user }) => {
  const { data: lastRequests, isLoading } = useGetLastRequests(user.id);

  return (
    <Box display="flex">
      <LastRequests lastRequests={lastRequests} isLoading={isLoading} />
    </Box>
  );
};
