import { useOutletContext } from "react-router-dom";
import {
  useGetLastRecommendations,
  useGetLastRequests,
} from "../../../hooks/api/admin/useUserAdministration";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { LastRequests } from "../../../components/user/requests/LastRequests";
import { LastRecommendations } from "../../../components/user/requests/LastRecommendations";

export const AdminUserDetailsActivityTab = () => {
  const { user } = useOutletContext();

  const { data: lastRequests, isLoading: requestLoading } = useGetLastRequests(
    user.id
  );
  const { data: lastRecommendations, isLoading: recommendationLoading } =
    useGetLastRecommendations(user.id);

  return (
    <>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Box aria-label="last-requests">
          <Typography paragraph gutterBottom>
            {user?.name} made {user?.statistics?.requestsCount} requests in
            total.
          </Typography>

          <Paper>
            <LastRequests
              lastRequests={lastRequests}
              isLoading={requestLoading}
            />
          </Paper>
        </Box>

        <Box aria-label="last-recommendations">
          <Typography paragraph gutterBottom>
            {user?.name} made {user?.statistics?.recommendationsCount}{" "}
            recommendations in total.
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
