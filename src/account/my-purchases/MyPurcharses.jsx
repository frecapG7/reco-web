import { UserPurchases } from "../../components/user/purchases/UserPurchases";
import { useAuthSession } from "../../context/AuthContext";

export const MyPurchases = () => {
  const { session } = useAuthSession();
  return <UserPurchases user={session?.user} />;
};
