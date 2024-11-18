import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormPassword } from "../../components/form/FormPassword";

export const SignupPasswordStep = () => {
  const { control, getValues } = useFormContext();

  return (
    <Box align="center">
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
    </Box>
  );
};
