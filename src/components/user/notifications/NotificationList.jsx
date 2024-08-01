import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NotificationListItem } from "./NotificationListItem";
import {
  useMarkAllAsRead,
  // useMarkAsRead,
} from "../../../hooks/api/users/useNotifications";
import { useAuthSession } from "../../../context/AuthContext";

export const NotificationList = ({
  notifications = [],
  hasUnread = false,
  hasMore = false,
  onShowMore = () => {},
}) => {
  const { session } = useAuthSession();
  // const markAsRead = useMarkAsRead({ userId: session.user?.id });
  const markAllAsRead = useMarkAllAsRead({ userId: session.user?.id });

  return (
    <Box>
      <List
        sx={{
          // position: "relative",
          maxHeight: 500,
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none", // IE and Edge
          scrollbarWidth: "none", // Firefox
        }}
        subheader={
          <li>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={1}
            >
              {hasUnread && (
                <>
                  <Fade
                    in={!markAllAsRead.isPending}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Typography
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => markAllAsRead.mutate()}
                    >
                      Mark all as read
                    </Typography>
                  </Fade>
                  <Fade in={markAllAsRead.isPending} mountOnEnter unmountOnExit>
                    <CircularProgress size={20} />
                  </Fade>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    color="black"
                    flexItem
                  />
                </>
              )}

              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
            </Box>
          </li>
        }
      >
        {notifications?.length === 0 && (
          <ListItem>
            <ListItemText primary="No notifications" />
          </ListItem>
        )}

        {notifications?.map((notification) => (
          <NotificationListItem
            key={notification.id}
            notification={notification}
            onClick={() => console.log("clicked")}
          />
        ))}

        {hasMore && (
          <ListItem>
            <Button onClick={onShowMore}>Show more</Button>
          </ListItem>
        )}
      </List>
    </Box>
  );
};
