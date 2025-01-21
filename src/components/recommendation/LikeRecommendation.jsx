import { useState } from "react";
import {
  useLikeRecommendation,
  useUnlikeRecommendation,
} from "../../hooks/api/requests/useRecommendations";
import { useAuthSession } from "../../context/AuthContext";
import { CircularProgress, IconButton } from "@mui/material";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";

export const LikeRecommendation = ({ recommendation }) => {
  /**
   * Usually I would use query invalidation
   * But I don't know how this will go with paginated results and all
   */
  const [likesCount, setLikesCount] = useState(recommendation?.likesCount);
  const [liked, setLiked] = useState(recommendation?.liked);

  const likeRecommendation = useLikeRecommendation(recommendation?.id);
  const unlikeRecommendation = useUnlikeRecommendation(recommendation?.id);

  const { session } = useAuthSession();
  const handleLike = async () => {
    if (!session?.loggedIn) {
      console.log("show login dialog");
      return;
    }
    await likeRecommendation.mutateAsync();
    setLiked(true);
    setLikesCount(likesCount + 1);
  };

  const handleUnlike = async () => {
    if (!session?.loggedIn) {
      console.log("show login dialog");
      return;
    }
    await unlikeRecommendation.mutateAsync();
    setLiked(false);
    setLikesCount(likesCount - 1);
  };

  if (likeRecommendation.isPending || unlikeRecommendation.isPending)
    return (
      <IconButton disabled>
        <CircularProgress />
      </IconButton>
    );

  return (
    <IconButton
      onClick={() => (liked ? handleUnlike() : handleLike())}
      variant={liked ? "contained" : "outlined"}
      disabled={likeRecommendation.isPending}
      color="secondary"
    >
      {liked ? (
        <>
          {likesCount}
          <LocalBarIcon fontSize="large" />
        </>
      ) : (
        <>
          {likesCount}
          <LocalBarOutlinedIcon fontSize="large" />
        </>
      )}
    </IconButton>
  );
};
