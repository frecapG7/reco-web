import { useOutletContext } from "react-router-dom";
import { UserPurchases } from "../../../components/user/purchases/UserPurchases";

export const AdminUserDetailsPurchasesTab = () => {
  const { user } = useOutletContext();

  return <UserPurchases user={user} />;
};
