import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { NotificationListItem } from "./NotificationListItem";

export const NotificationList = ({
  notifications = [],
  hasUnread = false,
  hasMore = false,
  onShowMore = () => {},
}) => {
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
                  <Typography
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Mark all as read
                  </Typography>
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
