import { Grid } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { FormText } from "../form/FormText";
import { FormSelect } from "../form/FormSelect";
import { FormEmail } from "../form/FormEmail";

export const UserForm = forwardRef(({ user, onSubmit }, ref) => {
  const { control, handleSubmit, reset } = useForm();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <FormText
          control={control}
          name="username"
          label="Username"
          rules={{ required: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormEmail control={control} name="email" label="Email" required />
      </Grid>
      <Grid item xs={12}>
        <FormSelect
          control={control}
          name="role"
          label="Role"
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
        />
      </Grid>
    </Grid>
  );
});

UserForm.displayName = "UserForm";
