import { Button, CircularProgress } from "@mui/material";
import { useAuthSession } from "../../../context/AuthContext";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { usePostFollow } from "../../../hooks/api/users/useFollows";
import { useState } from "react";

export const FollowButton = ({ user }) => {
  const { session } = useAuthSession();

  const postFollow = usePostFollow();

  const [isFollowing, setIsFollowing] = useState(false);

  if (!session.loggedIn) return <></>;

  if (user.id === session.user.id) return <></>;

  if (postFollow.isPending) return <CircularProgress />;

  if (isFollowing) {
    return (
      <Button variant="outlined" color="secondary">
        <PersonRemoveOutlinedIcon /> Unfollow
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() =>
        postFollow.mutate(user.id, {
          onSuccess: () => {
            setIsFollowing(true);
          },
        })
      }
    >
      <GroupAddOutlinedIcon /> Follow
    </Button>
  );
};
