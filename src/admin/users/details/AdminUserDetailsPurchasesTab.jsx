import { useOutletContext } from "react-router-dom";
import { UserPurchases } from "../../../components/user/purchases/UserPurchases";
import { useForm, useWatch } from "react-hook-form";
import { useGetPurchases } from "../../../hooks/api/users/useUsers";
import { Box, Grid } from "@mui/material";
import { PurchaseFilters } from "../../../components/purchase/PurchaseFilters";
import { PurchaseCard } from "../../../components/purchase/PurchaseCard";

export const AdminUserDetailsPurchasesTab = () => {
  const { user } = useOutletContext();
  const { control, setValue } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const filters = useWatch({
    control,
  });

  const { data } = useGetPurchases(user?.id, filters, {
    enabled: !!user,
  });

  const purchases = data?.pages?.flatMap((page) => page.results);

  return (
    <>
      <Box aria-label="search-filters">
        <PurchaseFilters control={control} setValue={setValue} />
      </Box>
      <Grid container aria-label="searc-content">
        {purchases?.map((purchase, index) => (
          <Grid item xs={12} md={3} key={index}>
            <PurchaseCard user={user} purchase={purchase} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
