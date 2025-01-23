import { Stack } from "@mui/material";
import { FormText } from "../form/FormText";
import { FormPassword } from "../form/FormPassword";
import { useTranslation } from "react-i18next";

export const LoginForm = ({ control }) => {
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
};
