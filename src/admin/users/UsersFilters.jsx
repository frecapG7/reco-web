import { Grid2 as Grid } from "@mui/material";

import { FormSelect } from "../../components/form/FormSelect";
import { FormSearch } from "../../components/form/FormSearch";

export const UsersFilters = ({ control }) => {
  return (
    <Grid container spacing={5} width="100%" alignItems="center">
      <Grid size={{ xs: 12, md: 5 }}>
        <FormSearch
          control={control}
          name="search"
          rules={{
            minLength: 2,
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <FormSelect
          control={control}
          name="role"
          options={[
            { label: "Admin", value: "ADMIN" },
            { label: "User", value: "USER" },
          ]}
        />
      </Grid>
    </Grid>
  );
};
