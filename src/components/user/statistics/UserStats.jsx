import { Box } from "@mui/material";
import { UserRequests } from "../icons/UserRequests";
import { UserRecommendations } from "../icons/UserRecommendations";
import { UserBalance } from "../icons/UserBalance";

export const UserStats = ({ stats }) => {
  //TODO: use id to fetch details

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      gap={5}
    >
      <UserRequests requests={stats.requestsCount} />
      <UserRecommendations recommendations={stats.recommendationsCount} />
      <UserBalance balance={stats.balance} />
    </Box>
  );
};
