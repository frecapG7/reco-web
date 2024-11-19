import { FormText } from "../../components/form/FormText";
import { useFormContext } from "react-hook-form";
import { useValidateUsername } from "../../hooks/api/validate/useValidate";

export const SignupUsernameStep = () => {
  const { control } = useFormContext();

  const { mutateAsync: validateUsername, isPending } = useValidateUsername();
  return (
    <FormText
      control={control}
      name="name"
      rules={{
        required: true,
        validate: async (value) => {
          try {
            await validateUsername(value);
          } catch (error) {
            return "Username already exists";
          }
        },
      }}
      disabled={isPending}
      placeholder="Rookie Balboa"
    />
  );
};
