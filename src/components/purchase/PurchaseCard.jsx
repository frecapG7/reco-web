import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import Face5OutlinedIcon from "@mui/icons-material/Face5Outlined";
import {
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

export const PurchaseCard = ({ user, purchase }) => {
  const navigate = useNavigate();

  const redeem = useRedeemPurchase(user.id, purchase._id);

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
          <Icon fontSize="large" color="secondary">
            <PurchaseBadge purchase={purchase} />
          </Icon>
        </Tooltip>
      }
    >
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <CardMedia component="img" image={purchase.icon} alt={purchase.name} />
        <CardContent>
          <Typography variant="title">{purchase.name}</Typography>
        </CardContent>
        <CardActions>
          <Stack>
            <Button color="primary" variant="contained" onClick={handleUse}>
              Use
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate(purchase._id)}
            >
              Details
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Badge>
  );
};
