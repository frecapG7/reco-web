import {
  Badge,
  Box,
  Button,
  Fade,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Logo } from "../components/utils/Logo";
import { useNavigate } from "react-router-dom";
import { useAuthSession } from "../context/AuthContext";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import { useRef, useState } from "react";
import {
  useNotifications,
  useUnreadCount,
} from "../hooks/api/users/useNotifications";
import { NotificationList } from "../components/user/notifications/NotificationList";

export const LayoutHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();

  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const { session } = useAuthSession();

  const onLogoClick = () => {
    if (isUpSm) navigate("/");
    else toggleMenu();
  };

  const notificationAnchorRef = useRef(null);
  const [openNotification, setOpenNotification] = useState(false);
  const { data: unreadCount } = useUnreadCount({
    userId: session?.user?.id,
    options: {
      enabled: session?.loggedIn,
    },
  });
  const { data: notifications, hasNextPage } = useNotifications({
    id: session?.user?.id,
    pageSize: 5,
    options: {
      enabled: openNotification,
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={0}
      sx={{
        flexGrow: 1,
      }}
    >
      <Box display="flex">
        <IconButton onClick={onLogoClick}>
          <Logo width={50} />
        </IconButton>
        <Box>
          <Typography variant="h6">Rococo</Typography>
          <Typography variant="body2">Welcome to my app</Typography>
        </Box>
      </Box>

      {session?.loggedIn && (
        <Box display="flex" gap={2} alignItems="center" aria-label="user-space">
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
          <IconButton>
            <Face5OutlinedIcon />
          </IconButton>
        </Box>
      )}

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
            onClick={() => setOpenNotification(false)}
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
