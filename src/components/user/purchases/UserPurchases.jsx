import { useGetPurchases } from "../../../hooks/api/users/usePurchases";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { PurchaseFilters } from "../../purchase/PurchaseFilters";
import { useNavigate } from "react-router-dom";

export const UserPurchases = ({ user }) => {
  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const filters = useWatch({
    control,
  });

  const { data: page } = useGetPurchases(user?.id, filters, 10, 1, {
    enabled: !!user,
  });
  const navigate = useNavigate();

  return (
    <Box>
      <Box aria-label="search-filters">
        <PurchaseFilters control={control} />
      </Box>
      <List aria-label="search-content">
        {page?.results?.map((purchase, index) => (
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
          >
            <ListItemButton onClick={() => navigate(purchase.id)}>
              <ListItemAvatar>
                <Avatar src={purchase.icon} alt={purchase.name} />
              </ListItemAvatar>
              <ListItemText
                primary={purchase.name}
                slotProps={{
                  primary: {
                    component: "h3",
                    fontWeight: "bold",
                  },
                }}
                secondary={purchase.type}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {page?.results?.length === 0 && (
        <Box
          display="flex"
          alignSelf="bottom"
          alignItems="flex-end"
          aria-label="search-pagination"
          my={5}
        >
          <Typography variant="h6">No results</Typography>
        </Box>
      )}
    </Box>
  );
};
