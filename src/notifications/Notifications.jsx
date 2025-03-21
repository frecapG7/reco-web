import { Badge, Box, Container, Paper, Typography } from "@mui/material";
import { NotificationList } from "../components/user/notifications/NotificationList";
import {
  useNotifications,
  useUnreadCount,
} from "../hooks/api/users/useNotifications";
import { useGetMe } from "../hooks/api/users/useUsers";
export const Notifications = () => {
  const { data: user } = useGetMe();

  const { data: unreadCount } = useUnreadCount(user?.id, {
    enabled: Boolean(user?.id),
  });
  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
  } = useNotifications(user?.id, 10, {
    enabled: Boolean(user?.id),
  });

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="title">
          <Badge badgeContent={unreadCount?.value || 0} color="primary">
            Notifications
          </Badge>
        </Typography>
      </Box>

      <Paper variant="brutalist1">
        <NotificationList
          notifications={notifications?.pages?.flatMap((page) => page.results)}
          hasMore={hasNextPage}
          onShowMore={fetchNextPage}
        />
      </Paper>
    </Container>
  );
};
