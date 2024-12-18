import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRedeemPurchase } from "../../hooks/api/users/useUsers";

const PurchaseBadge = ({ purchase }) => {
  switch (purchase.type) {
    case "ConsumablePurchase":
      return <LocalPizzaOutlinedIcon />;
    case "IconPurchase":
      return <Face5OutlinedIcon />;
    default:
      return "?";
  }
};

const PurchaseMedia = ({ purchase }) => {
  switch (purchase.type) {
    case "ConsumablePurchase":
      return (
        <CardMedia component="img" image={purchase.icon} alt={purchase.name} />
      );
    case "IconPurchase":
      return (
        <CardMedia align="center">
          <Avatar
            src={purchase.icon}
            alt={purchase.name}
            sx={{
              width: "10rem",
              height: "10rem",
              padding: 1,
            }}
          />
        </CardMedia>
      );
    default:
      return null;
  }
};

export const PurchaseCard = ({ user, purchase, canUse = false }) => {
  const navigate = useNavigate();

  const redeem = useRedeemPurchase(user.id, purchase.id);

  const handleUse = () => {
    redeem.mutate(
      {},
      {
        onSuccess: () => {
          alert("Purchase redeemed!");
        },
      }
    );
  };

  return (
    <Badge
      badgeContent={
        <Tooltip title={purchase.type}>
          <Icon fontSize="medium" variant="contained" color="primary">
            <PurchaseBadge purchase={purchase} />
          </Icon>
        </Tooltip>
      }
    >
      <Card
        sx={{
          maxWidth: 345,
          bgcolor: "background.default",
        }}
        // variant="outlined"
      >
        <CardContent
          sx={{
            p: 2,
          }}
        >
          <PurchaseMedia purchase={purchase} />
          <Typography variant="title">{purchase.name}</Typography>
        </CardContent>
        <CardActions>
          <Stack>
            {canUse && (
              <Button color="primary" variant="contained" onClick={handleUse}>
                Use
              </Button>
            )}
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate(purchase.id)}
            >
              Details
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Badge>
  );
};
