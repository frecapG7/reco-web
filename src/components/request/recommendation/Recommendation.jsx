import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { IFramely } from "../IFramely";
import { useAuthSession } from "../../../context/AuthContext";
import { i18nRelativeDate } from "../../../i18n/i18nTime";
import { useNavigate } from "react-router-dom";
import { LikeRecommendation } from "../../recommendation/LikeRecommendation";

export const Recommendation = ({ recommendation }) => {
  const { session } = useAuthSession();

  const navigate = useNavigate();

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
      <Grid container width="100%">
        <Grid size={{ xs: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardActionArea
              onClick={() => navigate(`/users/${recommendation.user.id}`)}
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
            </CardActionArea>
          </CardContent>
        </Grid>
        <Grid
          container
          size={{ xs: 10 }}
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
              gap={3}
            >
              <LikeRecommendation recommendation={recommendation} />
              <IconButton onClick={handleShare} variant="outlined">
                <ReplyOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
