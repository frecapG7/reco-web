import { Box, Button, CircularProgress, Typography } from "@mui/material";
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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 2,
        backgroundColor: "inherit",
      }}
    >
      {/* <Box
        sx={{
          flex: 1,
        }}
      >
        <Button>Precedent</Button>
      </Box> */}
      <Box>
        {recommendations?.map((recommendation, index) => (
          <Recommendation
            key={index}
            recommendation={recommendation}
            request={request}
          />
        ))}
      </Box>
      {/* <Box
        sx={{
          flex: 1,
        }}
      >
        <Button>Suivant</Button>
      </Box> */}
    </Box>
  );
};
