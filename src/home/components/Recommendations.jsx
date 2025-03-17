import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  MobileStepper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useGetRecommendations } from "../../hooks/api/requests/useRecommendations";
import { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";

export const Recommendations = ({ request }) => {
  const { data, isLoading } = useGetRecommendations(request.id, "likes", 3);

  const navigate = useNavigate();
  const recommendations = data?.pages.flatMap((page) => page.results);

  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading)
    return (
      <Box align="center">
        <CircularProgress />
      </Box>
    );

  if (!recommendations?.length)
    return (
      <Stack spacing={2} width="100%">
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate(`/requests/${request.id}/add-recommendation`)
            }
          >
            +
          </Button>
        </Box>
        <Box align="center">
          <Typography variant="body1">No recommendations yet</Typography>
        </Box>
      </Stack>
    );

  return (
    <Stack spacing={2} width="100%">
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Typography variant="h5"></Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/requests/${request.id}/add-recommendation`)}
        >
          + {request?.recommendationsCount} Recoco
        </Button>
      </Box>
      <Slide key={activeIndex} direction="right" in mountOnEnter unmountOnExit>
        <Card elevation={0} sx={{ width: "100%" }}>
          <CardHeader
            avatar={<Avatar src={recommendations[activeIndex]?.user?.avatar} />}
          />
        </Card>

        {/* <Box aria-label="recommendation" display="flex">
          <Recommendation
            recommendation={recommendations[activeIndex]}
            request={request}
          />
        </Box> */}
      </Slide>

      <MobileStepper
        variant="dots"
        position="static"
        steps={recommendations.length}
        activeStep={activeIndex}
        sx={{
          display: recommendations.length > 1 ? "flex" : "none",
          justifyContent: "center",
          borderRadius: 0,
          backgroundColor: "inherit",
        }}
        nextButton={
          <IconButton
            size="large"
            disabled={activeIndex === recommendations.length - 1}
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(activeIndex + 1);
            }}
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
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(activeIndex - 1);
            }}
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
