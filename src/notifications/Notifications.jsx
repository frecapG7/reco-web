import { Badge, Box, Container, Typography } from "@mui/material";
import { NotificationList } from "../components/user/notifications/NotificationList";
import {
  useNotifications,
  useUnreadCount,
} from "../hooks/api/users/useNotifications";
import { useAuthSession } from "../context/AuthContext";

export const Notifications = () => {
  const { session } = useAuthSession();
  const { data: unreadCount } = useUnreadCount({
    userId: session?.user?.id,
  });
  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
  } = useNotifications({
    id: session?.user?.id,
    pageSize: 10,
    options: {
      enabled: true,
    },
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

      <Box p={2}>
        <NotificationList
          notifications={notifications?.pages?.flatMap((page) => page.results)}
          hasMore={hasNextPage}
          onShowMore={fetchNextPage}
        />
      </Box>
    </Container>
  );
};
