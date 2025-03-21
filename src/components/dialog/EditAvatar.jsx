import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useGetPurchases } from "../../hooks/api/users/usePurchases";

export const EditAvatar = ({ open, onClose, user }) => {
  const { data } = useGetPurchases(
    user?.id,
    {
      type: "IconPurchase",
      pageSize: 3,
      pageNumber: 1,
    },
    {
      enabled: open,
    }
  );

  const items = data?.pages?.flatMap((page) => page.results);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Avatar</DialogTitle>
      <DialogContent>
        <Stack spacing={2} alignItems="center" justifyContent="center">
          {items?.map((item) => (
            <Avatar key={item.id} src={item.icon} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
