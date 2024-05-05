import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

export const RecommendationCard = ({ recommendation }) => {
  return (
    <Card>
      <CardHeader avatar={recommendation.user?.avatar}>
        {recommendation.user?.name}
      </CardHeader>
      <CardContent>{recommendation.field1}</CardContent>
      <CardContent>{recommendation.field2}</CardContent>
      <CardContent>{recommendation.field3}</CardContent>
      <CardActions>
        <Button size="small">TODO</Button>
      </CardActions>
    </Card>
  );
};
