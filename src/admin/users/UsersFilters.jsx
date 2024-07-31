import { Button, Grid } from "@mui/material";

import { FormText } from "../../components/form/FormText";
import { FormSelect } from "../../components/form/FormSelect";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const UsersFilters = ({ filters, setFilters }) => {
  const { control, watch } = useForm({
    defaultValues: filters,
  });

  const data = watch();
  useEffect(() => {
    setFilters(data);
  }, [data, setFilters]);

  return (
    <form>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={5}>
          <FormText
            control={control}
            name="search"
            rules={{
              minLength: 2,
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <FormSelect
            control={control}
            name="role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="baseline">
          <Button
            variant="contained"
            color="secondary"
            // onClick={handleSubmit(setFilters)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
