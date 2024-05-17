import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { BookRecommendation } from "./BookRecommendation";
import { MovieRecommendation } from "./MovieRecommendation";
import { SongRecommendation } from "./SongRecommendation";
import { UserName } from "../../user/UserName";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLikeRecommendation } from "../../../hooks/api/requests/useRecommendations";

import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import { useState } from "react";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import { IFramely } from "../IFramely";

export const Content = ({ recommendation, requestType }) => {
  switch (requestType) {
    case "BOOK":
      return <BookRecommendation recommendation={recommendation} />;
    case "MOVIE":
      return <MovieRecommendation recommendation={recommendation} />;

    case "SONG":
      return <SongRecommendation recommendation={recommendation} />;
    default:
      console.error("Unknown type : " + requestType);
      return <></>;
  }
};

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
        color: "primary.main",
        border: 1,
      }}
    >
      <CardHeader
        avatar={<Avatar />}
        title={recommendation.user.name}
        subheader={recommendation.user.title}
        disableTypography
      />
      <CardMedia
        sx={{
          maxHeight: 500,
        }}
      >
        <IFramely html={recommendation.html} />
      </CardMedia>
      <CardActions disableSpacing>
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
