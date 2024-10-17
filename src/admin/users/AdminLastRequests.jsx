import { useGetLastRequests } from "../../hooks/api/admin/useUserAdministration";

import { LastRequests } from "../../components/user/requests/LastRequests";

export const AdminLastRequests = ({ user }) => {
  const { data: lastRequests, isLoading } = useGetLastRequests(user.id);

  return <LastRequests lastRequests={lastRequests} isLoading={isLoading} />;
};
