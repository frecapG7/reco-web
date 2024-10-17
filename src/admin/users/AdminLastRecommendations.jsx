import { useGetLastRecommendations } from "../../hooks/api/admin/useUserAdministration";
import { LastRecommendations } from "../../components/user/requests/LastRecommendations";

export const AdminLastRecommendations = ({ user }) => {
  const { data: lastRecommendations, isLoading } = useGetLastRecommendations(
    user.id
  );

  return (
    <LastRecommendations
      lastRecommendations={lastRecommendations}
      isLoading={isLoading}
    />
  );
};
