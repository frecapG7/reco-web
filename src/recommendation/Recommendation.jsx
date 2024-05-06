import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import {
  useDislikeRecommendation,
  useLikeRecommendation,
} from "../api/recommendations";
import {
  BookRecommendation,
  BookRecommendationForm,
} from "./BookRecommendation";
import {
  MovieRecommendation,
  MovieRecommendationForm,
} from "./MovieRecommendation";

export const RecommendationContent = ({ requestType, recommendation }) => {
  switch (requestType) {
    case "BOOK":
      return <BookRecommendation recommendation={recommendation} />;
    case "MOVIE":
      return <MovieRecommendation recommendation={recommendation} />;
    default:
      return null;
  }
};

export const Recommendation = ({ request, recommendation }) => {
  const likeRecommendation = useLikeRecommendation(
    request.id,
    recommendation.id
  );
  const dislikeRecommendation = useDislikeRecommendation(
    request.id,
    recommendation.id
  );

  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={"author name"}
        subheader={recommendation.created_at?.toLocaleString()}
      ></CardHeader>
      <CardContent>
        <RecommendationContent
          requestType={request.requestType}
          recommendation={recommendation}
        />
      </CardContent>
      <CardActions>
        {recommendation?.liked ? (
          <Tooltip title="Dislike">
            <IconButton onClick={() => dislikeRecommendation.mutate()}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Like">
            <IconButton onClick={() => likeRecommendation.mutate()}>
              <FavoriteBorderIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Add to list">
          <IconButton>
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export const RecommendationForm = forwardRef(
  ({ requestType, recommendation, onSubmit }, ref) => {
    const { control, reset, watch, handleSubmit } = useForm();

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(onSubmit),
    }));

    switch (requestType) {
      case "BOOK":
        return <BookRecommendationForm control={control} />;
      case "MOVIE":
        return <MovieRecommendationForm control={control} />;
      default:
        return null;
    }
  }
);
