import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { useLikeRecommendation } from "../../../hooks/api/requests/useRecommendations";

import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import { IFramely } from "../IFramely";
import { useAuthSession } from "../../../context/AuthContext";

export const Recommendation = ({ request, recommendation }) => {
  const { session } = useAuthSession();

  const likeRecommendation = useLikeRecommendation(
    request.id,
    recommendation.id
  );

  const handleLike = () => {
    if (!session?.loggedIn) {
      console.log("show login dialog");
    } else {
      likeRecommendation.mutate(
        {},
        {
          onSuccess: () => console.log("show toast ?"),
        }
      );
    }
  };

  const handleShare = () => {
    if (!session?.loggedIn) {
      console.log("show login dialog");
    } else {
      console.log("show share dialog");
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "inherit",
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
        // disableSpacing
        sx={
          {
            // backgroundColor: "white",
          }
        }
      >
        <IconButton
          onClick={handleLike}
          sx={{
            fontSize: 50,
            border: "2px solid",
            borderColor: "secondary.main",
            backgroundColor: "secondary.main",
          }}
        >
          <LocalBarRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton
          sx={{
            fontSize: 50,
            border: "2px solid",
            borderColor: "secondary.main",
            backgroundColor: "secondary.main",
          }}
          onClick={handleShare}
        >
          <ShareRoundedIcon fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
