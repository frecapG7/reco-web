import { useFormContext } from "react-hook-form";
import { FormText } from "../../components/form/FormText";
import { useValidateToken } from "../../hooks/api/validate/useValidate";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const SignupTokenStep = () => {
  const { control } = useFormContext();

  const { t } = useTranslation();
  const { mutateAsync: validateToken, isPending } = useValidateToken();

  return (
    <Box
      display="flex"
      flexDirection="column"
      spacing={2}
      justifyContent="space-evenly"
      flexGrow={1}
    >
      <Typography variant="label">{t("signup.disclaimer")}</Typography>
      <FormText
        control={control}
        name="token"
        disabled={isPending}
        rules={{
          required: true,
          minLength: 8,
          maxLength: 20,
          validate: async (value) => {
            try {
              await validateToken(value);
            } catch (e) {
              console.warn(e);
              return "Invalid token";
            }
          },
        }}
        InputProps={{
          endAdornment: isPending && <CircularProgress size={20} />,
        }}
      />
    </Box>
  );
};
