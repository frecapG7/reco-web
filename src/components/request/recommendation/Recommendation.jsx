import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useLikeRecommendation } from "../../../hooks/api/requests/useRecommendations";

import LocalBarRoundedIcon from "@mui/icons-material/LocalBarRounded";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { IFramely } from "../IFramely";
import { useAuthSession } from "../../../context/AuthContext";
import { i18nRelativeDate } from "../../../i18n/i18nTime";

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

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        display: "flex",
        p: 0,
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <CardContent
            sx={{
              // width: "100px",
              // height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack aria-label="recommendation-user" alignItems="center">
              <Avatar
                src={recommendation.user.avatar}
                alt={recommendation.user.name}
              />
              <Typography variant="h6">{recommendation.user.name}</Typography>
              <Typography>
                {i18nRelativeDate(recommendation.created_at)}
              </Typography>
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
            <Box
              sx={{ flexGrow: 1, mx: 5 }}
              justifyContent="flex-end"
              display="flex"
            >
              <Button
                onClick={handleLike}
                variant={recommendation?.liked ? "contained" : "outlined"}
                disabled={recommendation?.liked}
              >
                {recommendation?.likesCount}
                <LocalBarRoundedIcon fontSize="large" />
              </Button>
              <Button onClick={handleShare} variant="outlined">
                <ReplyOutlinedIcon fontSize="large" />
              </Button>
            </Box>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
