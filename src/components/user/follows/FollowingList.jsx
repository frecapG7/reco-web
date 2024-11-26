import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  IconButton,
} from "@mui/material";
import { useGetFollows } from "../../../hooks/api/users/useFollows";
import GroupIcon from "@mui/icons-material/Group";
import { i18nRelativeDate } from "../../../i18n/i18nTime";

import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export const FollowingList = ({ user }) => {
  const { data: follows } = useGetFollows(user?.id, 1, 10, {
    enabled: !!user,
  });

  return (
    <Box width="100%">
      <List>
        <ListSubheader
          component="div"
          sx={{
            backgroundColor: "inherit",
          }}
        >
          <Box display="flex" alignItems="center">
            <GroupIcon />
            <Box ml={1}>{follows?.pagination.totalResults} Following</Box>
          </Box>
        </ListSubheader>
        {follows?.results.map((follow) => (
          <ListItem
            key={follow.id}
            secondaryAction={
              <IconButton variant="contained">
                <PersonRemoveIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar alt={follow.name} src={follow.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={follow.name}
              secondary={i18nRelativeDate(follow.addedAt)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
