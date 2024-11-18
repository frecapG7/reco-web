import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slide,
  Paper,
} from "@mui/material";

import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useState } from "react";

export const StoreItemCard = ({
  label,
  name,
  description,
  icon,
  price,
  onClick,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardActionArea onClick={onClick}>
        <CardContent
          sx={{
            alignItems: "center",
          }}
        >
          <CardMedia component="img" height="250" image={icon} alt={name} />
          <Typography variant="title" textAlign="center">
            {label}
          </Typography>
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
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 10,
              }}
            >
              {description}
            </Typography>
          </Paper>
        </Slide>
      </CardActionArea>
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" color="primary" onClick={onClick}>
          {price}
          <MonetizationOnOutlinedIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
