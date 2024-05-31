import {
  Box,
  CircularProgress,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useGetLastRequests } from "../../hooks/api/admin/useUserAdministration";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

import { LastRequests } from "../../components/user/requests/LastRequests";

export const AdminLastRequests = ({ user }) => {
  const { data: lastRequests, isLoading } = useGetLastRequests(user.id);

  if (isLoading)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  return <LastRequests LastRequests={lastRequests} />;
};
