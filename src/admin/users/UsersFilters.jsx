import { Grid2 as Grid } from "@mui/material";

import { FormText } from "../../components/form/FormText";
import { FormSelect } from "../../components/form/FormSelect";

export const UsersFilters = ({ control }) => {
  return (
    <Grid container spacing={5} width="100%" alignItems="center">
      <Grid size={{ xs: 12, md: 5 }}>
        <FormText
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
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
        />
      </Grid>
    </Grid>
  );
};
