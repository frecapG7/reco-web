import { Avatar, Card, CardHeader, CardMedia, Paper } from "@mui/material";
import { i18nDateTime } from "../../utils/i18n";
import { IFramely } from "../../components/request/IFramely";

export const RecommendationCard = ({ recommendation }) => {
  return (
    <Card
      key={recommendation.id}
      elevation={0}
      sx={{
        width: "100%",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={recommendation.user.avatar}
            alt={recommendation.user.name}
          />
        }
        title={recommendation.user.name}
        subheader={i18nDateTime(recommendation?.createdAt)}
        action={<Paper>{recommendation?.likes} likes</Paper>}
      />

      <CardMedia>
        <IFramely html={recommendation.html} />
      </CardMedia>
    </Card>
  );
};
