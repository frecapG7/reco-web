import { Box, Divider, Stack, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useGetLastRecommendations } from "../../hooks/api/users/useUsers";
import { LastRecommendations } from "../../components/user/requests/LastRecommendations";

export const MyActivity = () => {
  const { user } = useOutletContext();

  // const { data: lastRequests, isLoading: requestLoading } = useGetLastRequests(
  //   user.id
  // );
  const { data: lastRecommendations, isLoading: recommendationLoading } =
    useGetLastRecommendations(user.id);

  return (
    <>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Box aria-label="last-requests">
          <Typography paragraph gutterBottom>
            You made {user?.statistics?.requestsCount} requests in total.
          </Typography>
          {/* <LastRequests
            lastRequests={lastRequests}
            isLoading={requestLoading}
          /> */}
        </Box>

        <Box aria-label="last-recommendations">
          <Typography paragraph gutterBottom>
            You made {user?.statistics?.recommendationsCount} recommendations in
            total.
          </Typography>
          <LastRecommendations
            lastRecommendations={lastRecommendations}
            isLoading={recommendationLoading}
          />
        </Box>
      </Stack>
    </>
  );
};
