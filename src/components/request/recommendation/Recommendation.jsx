import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
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

  const html = recommendation.html;
  // '<div><div style="left: 0; width: 100%; height: 140px; position: relative;"><iframe src="//cdn.iframe.ly/api/iframe?card=small&app=1&url=https%3A%2F%2Fwww.babelio.com%2Flivres%2FHamilton-Letoile-de-Pandore-tome-1--Pandore-abusee%2F1412421&key=3bfef4cf586ad76048e1aff7cbc5f05e" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen></iframe></div></div>';h
  // '<div><div style="left: 0; width: 100%; height: 140px; position: relative;"><iframe src="//cdn.iframe.ly/api/iframe?card=small&app=1&url=https%3A%2F%2Fsoundcloud.com%2Fcerclelive%2Fmaz-antdot-run-radio-edit%3Fsi%3D2c3644debf954180b13d76f67e3ca6c0%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&key=3bfef4cf586ad76048e1aff7cbc5f05e" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen allow="autoplay *;"></iframe></div></div>';

  return (
    <Card
      // variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        p: 0,
        // backgroundColor: "primary.main",
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <CardContent>
            <Stack aria-label="recommendation-user" alignItems="center">
              <Avatar
                src={recommendation.user.avatar}
                alt={recommendation.user.name}
              />
              <Typography>{recommendation.user.name}</Typography>
            </Stack>
          </CardContent>
        </Grid>
        <Grid
          item
          container
          xs={10}
          sx={{
            // display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CardMedia>
            <IFramely html={html} />
          </CardMedia>
          <CardActions>
            <IconButton onClick={handleLike}>
              <LocalBarRoundedIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareRoundedIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
