import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const IconItemCard = ({ item }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="250" image={item.img} alt="item" />
        <CardContent
          sx={{
            height: 100,
            alignItems: "center",
          }}
        >
          <Typography variant="title">{item.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="primary">
          {item.price}
          <MonetizationOnOutlinedIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
