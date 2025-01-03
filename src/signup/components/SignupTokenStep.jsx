import { useFormContext } from "react-hook-form";
import { FormText } from "../../components/form/FormText";
import { useValidateToken } from "../../hooks/api/validate/useValidate";
import { Alert, CircularProgress } from "@mui/material";

export const SignupTokenStep = () => {
  const { control } = useFormContext();

  const { mutateAsync: validateToken, isPending } = useValidateToken();

  return (
    <>
      <FormText
        control={control}
        name="token"
        disabled={isPending}
        rules={{
          required: true,
          minLength: 8,
          maxLength: 8,
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
      <Alert severity="info">
        Rococos is a private network, if you have a friends inside you might ask
        him to buy you an invitation token{" "}
      </Alert>
    </>
  );
};
