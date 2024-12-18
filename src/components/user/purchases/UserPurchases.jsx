import { useGetPurchases } from "../../../hooks/api/users/useUsers";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Icon,
  ListItemButton,
  IconButton,
  Stack,
  SvgIcon,
  Button,
  ListItemAvatar,
  Avatar,
  Paper,
  Badge,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { PurchaseFilters } from "../../purchase/PurchaseFilters";
import { useNavigate } from "react-router-dom";

export const UserPurchases = ({ user }) => {
  const { control, setValue } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const filters = useWatch({
    control,
  });

  const { data } = useGetPurchases(user?.id, filters, 10, {
    enabled: !!user,
  });
  const navigate = useNavigate();

  const purchases = data?.pages?.flatMap((page) => page.results);

  return (
    <>
      <Box aria-label="search-filters">
        <PurchaseFilters control={control} setValue={setValue} />
      </Box>
      <List aria-label="search-content">
        {purchases?.map((purchase, index) => (
          <ListItem
            key={index}
            divider
            secondaryAction={
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  borderRadius: "50%",
                  backgroundColor: "primary.main",
                }}
              >
                {purchase.quantity}
              </Paper>
            }
            // disablePadding
          >
            <ListItemButton onClick={() => navigate(purchase.id)}>
              <ListItemAvatar>
                <Avatar src={purchase.icon} alt={purchase.name} />
              </ListItemAvatar>
              <ListItemText
                primary={purchase.name}
                primaryTypographyProps={{
                  fontWeight: "bold",
                  variant: "h6",
                }}
                secondary={purchase.type}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {purchases?.length === 0 && (
        <Box
          display="flex"
          alignSelf="bottom"
          alignItems="flex-end"
          aria-label="search-pagination"
          my={5}
        >
          <Typography variant="h6">
            You have made no purchases yet. Visit our store to explore and make
            your first purchase!
          </Typography>
        </Box>
      )}
    </>
  );
};
