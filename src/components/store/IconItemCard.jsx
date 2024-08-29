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
import { confirm } from "../utils/ConfirmationDialog";

export const IconItemCard = ({ item }) => {
  const handleBuy = () => {
    confirm({
      description: `Buying ${item.name} will cost you ${item.price}.`,
    })
      .then(() => {
        console.log(`You have bought ${item.name} for ${item.price}.`);
      })
      .catch(() => {});
  };

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
        <Button variant="contained" color="primary" onClick={handleBuy}>
          {item.price}
          <MonetizationOnOutlinedIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
