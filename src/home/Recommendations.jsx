import { Box, CircularProgress, Typography } from "@mui/material";
import { useGetRecommendations } from "../hooks/api/requests/useRecommendations";
import { RecommendationCard } from "../components/request/RecommendationCard";
import { Fragment } from "react";

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
        <Fragment key={index}>
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        </Fragment>
      ))}
    </Box>
  );
};
