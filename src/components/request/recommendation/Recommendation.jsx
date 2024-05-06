import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { BookRecommendation } from "./BookRecommendation";
import { MovieRecommendation } from "./MovieRecommendation";
import { SongRecommendation } from "./SongRecommendation";
import { UserName } from "../../user/UserName";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLikeRecommendation } from "../../../hooks/api/requests/useRecommendations";

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
    <Card>
      <CardHeader title={<UserName user={recommendation.user} />} />
      <CardContent>
        <Content
          recommendation={recommendation}
          requestType={request.requestType}
        />
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "flex-end",
        }}
        disableSpacing
      >
        {likeRecommendation.isPending && <CircularProgress />}
        {!likeRecommendation.isPending && (
          <IconButton size="large" onClick={handleLike}>
            <Badge
              content={100}
              showZero={false}
              color="primary"
              sx={{
                fontSize: 50,
              }}
            >
              <FavoriteIcon />
            </Badge>
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
