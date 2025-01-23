import { FormText } from "../../components/form/FormText";
import { useFormContext } from "react-hook-form";
import { useValidateUsername } from "../../hooks/api/validate/useValidate";
import { Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormPassword } from "../../components/form/FormPassword";

export const SignupUsernameStep = () => {
  const { control, getValues } = useFormContext();

  const { t } = useTranslation();

  const { mutateAsync: validateUsername, isPending } = useValidateUsername();
  return (
    <Stack spacing={1}>
      <Typography>{t("signup.contact_disclaimer")}</Typography>
      <FormText
        control={control}
        label="Username"
        name="name"
        rules={{
          required: true,
          validate: async (value) => {
            try {
              await validateUsername(value);
            } catch (e) {
              console.warn(e);
              return "Username already exists";
            }
          },
        }}
        disabled={isPending}
        placeholder="Rookie Balboa"
      />
      <FormText
        control={control}
        label="Email"
        name="email"
        rules={{
          required: true,
          validate: async (value) => {
            try {
              await validateUsername(value);
            } catch (e) {
              console.warn(e);
              return "Email already exists";
            }
          },
        }}
      />

      <Divider />
      <FormPassword
        control={control}
        name="password"
        label="Password"
        rules={{ required: true }}
      />
      <FormPassword
        control={control}
        name="confirmPassword"
        label="Confirm password"
        rules={{
          required: true,
          validate: (value) => {
            return value === getValues("password") || "Passwords do not match";
          },
        }}
      />
    </Stack>
  );
};
