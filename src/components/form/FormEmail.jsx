import { FormControl, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

export const FormEmail = ({
  control,
  name,
  label,
  disabled = false,
  required = false,
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address",
      },
    },
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      <TextField
        fullWidth
        name={name}
        label={label}
        inputRef={ref}
        value={value}
        onChange={(e) => onChange(e.target?.value?.trim())}
        onBlur={onBlur}
        disabled={disabled}
        error={!!error}
        helperText={i18nFormError(error)}
        required={required}
      />
    </FormControl>
  );
};
