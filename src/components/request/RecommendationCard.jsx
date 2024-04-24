import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { UserName } from "../user/UserName";

export const RecommendationCard = ({ recommendation }) => {
  return (
    <Card>
      <CardHeader avatar={recommendation.user.avatar}></CardHeader>
      <CardContent></CardContent>
      <CardActions>
        <Button size="small">TODO</Button>
      </CardActions>
    </Card>
  );
};
