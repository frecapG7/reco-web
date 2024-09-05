import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  Typography,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { confirm } from "../utils/ConfirmationDialog";
import { useState } from "react";
import { IconItemDetail } from "./IconItemDetail";

export const IconItemCard = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleBuy = () => {
    confirm({
      description: `Buying ${item.label} will cost you ${item.price}.`,
    })
      .then(() => {
        console.log(`You have bought ${item.label} for ${item.price}.`);
        setShowDetails(false);
      })
      .catch(() => {});
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="250" image={item.url} alt="item" />
          <CardContent
            sx={{
              height: 100,
              alignItems: "center",
            }}
          >
            <Typography variant="title">{item.name}</Typography>
            {/* <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowDetails(true)}
          >
            {item.price}
            <MonetizationOnOutlinedIcon />
          </Button>
        </CardActions>
      </Card>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={showDetails}
        scroll="body"
        onClose={() => setShowDetails(false)}
      >
        <IconItemDetail iconItem={item} onBuy={handleBuy} />
        <DialogActions>
          <Button
            onClick={() => setShowDetails(false)}
            variant="outlined"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
