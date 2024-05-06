import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetRecommendations } from "../hooks/api/requests/useRecommendations";
import { Recommendation } from "../components/request/recommendation/Recommendation";

export const Recommendations = ({ request }) => {
  const { data: recommendations, isLoading } = useGetRecommendations(
    request.id
  );

  if (isLoading)
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  if (!recommendations?.length)
    return (
      <Box align="center">
        <Typography variant="body1">No recommendations yet</Typography>
      </Box>
    );

  return (
    <Box>
      {recommendations?.map((recommendation, index) => (
        <Recommendation
          key={index}
          recommendation={recommendation}
          request={request}
        />
      ))}
    </Box>
  );
};
