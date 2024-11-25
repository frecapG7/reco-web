import { useGetPurchases } from "../../../hooks/api/users/useUsers";
import { Box } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { PurchaseFilters } from "../../purchase/PurchaseFilters";
import { PurchaseCard } from "../../purchase/PurchaseCard";
import Grid from "@mui/material/Grid2";
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

  const purchases = data?.pages?.flatMap((page) => page.results);

  return (
    <>
      <Box aria-label="search-filters">
        <PurchaseFilters control={control} setValue={setValue} />
      </Box>
      <Grid container aria-label="searc-content">
        {purchases?.map((purchase, index) => (
          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
            key={index}
          >
            <PurchaseCard user={user} purchase={purchase} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
