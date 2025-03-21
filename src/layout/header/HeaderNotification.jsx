import {
  Badge,
  Box,
  Fade,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useAuthSession } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { NotificationList } from "../../components/user/notifications/NotificationList";
import {
  useNotifications,
  useUnreadCount,
} from "../../hooks/api/users/useNotifications";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNavigate } from "react-router-dom";

export const HeaderNotification = () => {
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { session } = useAuthSession();
  const notificationAnchorRef = useRef(null);
  const [openNotification, setOpenNotification] = useState(false);
  const { data: unreadCount } = useUnreadCount(session?.user?.id, {
    enabled: Boolean(session?.user?.id),
  });
  const { data: notifications, hasNextPage } = useNotifications(
    session?.user?.id,
    5,
    {
      enabled: openNotification,
    }
  );

  const navigate = useNavigate();
  return (
    <Box>
      <IconButton
        ref={notificationAnchorRef}
        onClick={() =>
          isUpSm
            ? setOpenNotification(!openNotification)
            : navigate("/notifications")
        }
      >
        <Badge badgeContent={unreadCount?.value || 0} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>

      {isUpSm && (
        <Popover
          anchorEl={notificationAnchorRef.current}
          open={openNotification}
          onClose={() => setOpenNotification(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          marginThreshold={20}
          disableScrollLock
          elevation={0}
          slotProps={{
            paper: {
              variant: "outlined",
              scroll: "body",
              sx: {
                my: 2,
                p: 2,
              },
            },
          }}
          TransitionComponent={Fade}
        >
          <Box
            // onClick={() => setOpenNotification(false)}
            sx={{
              width: 350,
            }}
          >
            <Stack spacing={1}>
              <Typography variant="title">
                <Badge badgeContent={unreadCount?.value || 0} color="primary">
                  Notifications
                </Badge>
              </Typography>
              <NotificationList
                notifications={notifications?.pages.flatMap(
                  (page) => page.results
                )}
                hasUnread={unreadCount?.value > 0}
                hasMore={hasNextPage}
                onShowMore={() => navigate("/notifications")}
              />
            </Stack>
          </Box>
        </Popover>
      )}
    </Box>
  );
};
