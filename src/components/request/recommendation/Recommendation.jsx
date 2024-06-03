import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useLikeRecommendation } from "../../../hooks/api/requests/useRecommendations";

import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import { useState } from "react";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { IFramely } from "../IFramely";

export const Recommendation = ({ request, recommendation }) => {
  const [rate, setRate] = useState("");

  const likeRecommendation = useLikeRecommendation(
    request.id,
    recommendation.id
  );

  const handleLike = () => {
    likeRecommendation.mutate(
      {},
      {
        onSuccess: () => console.log("show toast ?"),
      }
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "secondary.light",
      }}
    >
      <CardHeader
        avatar={<Avatar />}
        title={recommendation.user.name}
        subheader={recommendation.user.title}
        sx={{
          maxHeight: 50,
        }}
      />
      <CardMedia
        sx={{
          maxHeight: 500,
        }}
      >
        <IFramely html={recommendation.html} />
      </CardMedia>
      <CardActions
        disableSpacing
        sx={{
          backgroundColor: "white",
        }}
      >
        <ToggleButtonGroup
          exclusive
          fullWidth
          aria-label="like-button"
          value={rate}
          onChange={(event, newValue) => setRate(newValue)}
        >
          <ToggleButton value="like" aria-label="like">
            <HourglassEmptyOutlinedIcon fontSize="large" />
          </ToggleButton>
          <ToggleButton value="dislike">
            <LocalBarRoundedIcon fontSize="large" />
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};
