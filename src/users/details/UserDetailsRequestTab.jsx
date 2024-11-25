import { useOutletContext } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserRequests } from "../../components/user/requests/UserRequests";
import { Box, Typography } from "@mui/material";

export const UserDetailsRequestTab = () => {
  const { user } = useOutletContext();

  if (!user?.privacy?.showRequests)
    return (
      <Box align="center">
        <LockOutlinedIcon color="primary.main" fontSize="large" />
        <Typography variant="caption" paragraph>
          This user has their request history set to private.
        </Typography>
      </Box>
    );

  return <UserRequests user={user} />;
};
