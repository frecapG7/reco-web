import { useGetPurchases } from "../../../hooks/api/users/useUsers";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Avatar,
  ListItemButton,
  IconButton,
  Stack,
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
            secondaryAction={
              <Stack direction="row">
                <IconButton>toto</IconButton>
                <IconButton>toto</IconButton>
                <IconButton>toto</IconButton>
              </Stack>
            }
            divider
            // disablePadding
          >
            <ListItemButton onClick={() => navigate(purchase.id)}>
              <ListItemIcon>
                <Avatar
                  src={purchase.icon}
                  sx={{
                    width: 75,
                    height: 75,
                  }}
                />
              </ListItemIcon>
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
