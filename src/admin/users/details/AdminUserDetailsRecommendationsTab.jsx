import { useOutletContext } from "react-router-dom";
import { UserRecommendations } from "../../../components/user/requests/UserRecommendations";

export const AdminUserDetailsRecommendationsTab = () => {
  const { user } = useOutletContext();

  return (
    <>
      <UserRecommendations user={user} />
    </>
  );
};
