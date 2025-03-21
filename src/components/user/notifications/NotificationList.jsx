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
  Tooltip,
  Typography,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  useMarkAllAsRead,
  useMarkAsRead,
} from "../../../hooks/api/users/useNotifications";
import useI18nTime from "../../../hooks/i18n/useI18nTime";
import { useAuthSession } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NotificationList = ({
  notifications = [],
  hasUnread = false,
  hasMore = false,
  onShowMore = () => {},
}) => {
  const { session } = useAuthSession();
  const markAsRead = useMarkAsRead(session.user?.id);
  const markAllAsRead = useMarkAllAsRead(session.user?.id);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const { relativeTime } = useI18nTime();

  const handleNotificationClick = async (notification) => {
    await markAsRead.mutateAsync(notification.id);
    //TODO : navigate somewhere
  };

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
              <IconButton onClick={() => navigate("/settings/notifications")}>
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
          <ListItem
            key={notification.id}
            divider
            onClick={handleNotificationClick}
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.1)",
                cursor: "pointer",
              },
            }}
            secondaryAction={
              notification.read ? (
                <></>
              ) : (
                <Tooltip title="Mark as read">
                  <IconButton aria-label="mark-as-read">
                    <FiberManualRecordIcon color="primary" />
                  </IconButton>
                </Tooltip>
              )
            }
          >
            <ListItemText
              primary={t(`notifications.${notification.type}`, {
                username: notification.from.name,
              })}
              secondary={relativeTime(notification.createdAt)}
            />
          </ListItem>
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
