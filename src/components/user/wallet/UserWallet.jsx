import { Card, CardHeader, Skeleton } from "@mui/material";
import { useGetBalance } from "../../../hooks/api/users/useUsers";
import { i18nRelativeDate } from "../../../i18n/i18nTime";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";

export const UserWallet = ({ user }) => {
  const { data: wallet } = useGetBalance(user.id, true);

  if (!wallet) return;
  <Skeleton variant="rectangular" width="100%" height="100px" />;

  return (
    <Card width="100%">
      <CardHeader
        avatar={<WalletOutlinedIcon />}
        title={wallet?.balance}
        subheader={`Last refill: ${i18nRelativeDate(wallet?.lastFilled)}`}
      />
    </Card>
  );
};
