import { FormControl, FormLabel, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

export const FormText = ({
  name,
  label,
  control,
  multiline,
  rows,
  rules,
  required,
  disabled,
  ...rest
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required, ...rules },
    defaultValue: "",
  });

  return (
    <FormControl fullWidth disabled={disabled}>
      <FormLabel required={required}>{label}</FormLabel>
      <TextField
        fullWidth
        name={name}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        error={!!error}
        helperText={i18nFormError(error)}
        required={required}
        multiline={multiline}
        rows={rows}
        minRows={rules?.minRows ? rules.minRows : 0}
        maxRows={rules?.maxRows ? rules.maxRows : 0}
        variant="outlined"
        {...rest}
      />
    </FormControl>
  );
};
