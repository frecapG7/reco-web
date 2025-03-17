import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box, Typography } from "@mui/material";
import { UserRecommendations } from "../../components/user/requests/UserRecommendations";
import { useOutletContext } from "react-router-dom";

export const UserDetailsRecommendationsTab = () => {
  const { user } = useOutletContext();
  if (user?.privacy?.privateRecommendations)
    return (
      <Box align="center" mt={5}>
        <LockOutlinedIcon
          color="primary.main"
          sx={{
            height: 50,
            width: 50,
          }}
        />
        <Typography variant="caption" component={Box}>
          This user has their recommendations history set to private.
        </Typography>
      </Box>
    );

  return <UserRecommendations user={user} />;
};
