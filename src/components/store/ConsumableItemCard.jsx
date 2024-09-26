import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Grow,
  Slide,
  Paper,
} from "@mui/material";

import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState } from "react";

export const ConsumableItemCard = ({ item }) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={item.icon}
            alt="item"
          />
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
          <Slide in={hover} timeout={300} direction="up">
            <Paper
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                p: 2,
                bgcolor: "primary.main",
              }}
            >
              <Typography variant="body2">{item.description}</Typography>
            </Paper>
          </Slide>
        </CardActionArea>
        <CardActions>
          <Button variant="contained" color="primary">
            {item.price}
            <MonetizationOnOutlinedIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
