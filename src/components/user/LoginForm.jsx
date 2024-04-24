import { Stack } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { FormText } from "../form/FormText";
import { FormPassword } from "../form/FormPassword";
import { useForm } from "react-hook-form";

export const LoginForm = forwardRef(({ onSubmit }, ref) => {
  const { control, reset, handleSubmit } = useForm();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    reset: reset,
  }));

  return (
    <Stack spacing={5}>
      <FormText
        name="name"
        label="Username"
        control={control}
        rules={{ required: true }}
      />
      <FormPassword
        name="password"
        label="Password"
        control={control}
        rules={{ required: true }}
      />
    </Stack>
  );
});

LoginForm.displayName = "LoginForm";
