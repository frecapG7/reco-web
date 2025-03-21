import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { i18nRelativeDate } from "../../../i18n/i18nTime";

const buildLabel = (notification) => {
  switch (notification.type) {
    case "like_request":
      return `${notification.from.name} liked your request`;
    case "like_recommendation":
      return `${notification.from.name} liked your recommendation`;
    default:
      return "Unknown notification";
  }
};

export const NotificationListItem = ({ notification, onClick }) => {

  return (
    <ListItem
      key={notification.id}
      divider
      onClick={onClick}
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
        primary={buildLabel(notification)}
        secondary={i18nRelativeDate(notification.createdAt)}
      />
    </ListItem>
  );
};
