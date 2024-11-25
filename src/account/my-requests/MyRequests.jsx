import { useOutletContext } from "react-router-dom";
import { UserRequests } from "../../components/user/requests/UserRequests";

export const MyRequests = () => {
  const { user } = useOutletContext();

  return (
    <>
      <UserRequests user={user} />
    </>
  );
};
