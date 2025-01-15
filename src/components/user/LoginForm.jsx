import { Stack } from "@mui/material";
import { forwardRef, useImperativeHandle } from "react";
import { FormText } from "../form/FormText";
import { FormPassword } from "../form/FormPassword";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const LoginForm = forwardRef(({ onSubmit }, ref) => {
  const { control, reset, handleSubmit } = useForm();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    reset: reset,
  }));

  const { t } = useTranslation();

  return (
    <Stack spacing={5}>
      <FormText
        name="name"
        label={t("user.emailOrUsername")}
        control={control}
        required
      />
      <FormPassword
        name="password"
        label={t("user.password")}
        control={control}
        rules={{ required: true }}
      />
    </Stack>
  );
});

LoginForm.displayName = "LoginForm";
