import { Button, Grid } from "@mui/material";

import { FormText } from "../../components/form/FormText";
import { FormSelect } from "../../components/form/FormSelect";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const UsersFilters = ({ filters, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset(filters);
  }, [reset, filters]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={5}>
        <FormText control={control} name="regex" />
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
          onClick={handleSubmit(onSubmit)}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};
