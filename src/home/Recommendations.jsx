import {
  Box,
  CircularProgress,
  IconButton,
  MobileStepper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useGetRecommendations } from "../hooks/api/requests/useRecommendations";
import { Recommendation } from "../components/request/recommendation/Recommendation";
import { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const Recommendations = ({ request }) => {
  const { data: recommendations, isLoading } = useGetRecommendations(
    request.id
  );

  const [activeIndex, setActiveIndex] = useState(0);

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
    <Stack>
      <Slide key={activeIndex} direction="right" in mountOnEnter unmountOnExit>
        <Box aria-label="recommendation" display="flex">
          <Recommendation
            recommendation={recommendations[activeIndex]}
            request={request}
          />
        </Box>
      </Slide>

      <MobileStepper
        variant="dots"
        position="static"
        steps={recommendations.length}
        activeStep={activeIndex}
        sx={{
          // maxWidth: 400,
          flexGrow: 1,
          display: recommendations.length > 1 ? "flex" : "none",
          justifyContent: "center",
          borderRadius: 0,
          backgroundColor: "inherit",
        }}
        nextButton={
          <IconButton
            size="large"
            disabled={activeIndex === recommendations.length - 1}
            onClick={() => setActiveIndex(activeIndex + 1)}
            variant="contained"
            sx={{
              mx: 5,
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        }
        backButton={
          <IconButton
            size="large"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
            variant="contained"
            sx={{
              mx: 5,
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        }
      />
    </Stack>
  );
};
