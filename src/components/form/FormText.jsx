import { FormControl, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../i18n/i18nForm";
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
      <TextField
        fullWidth
        name={name}
        label={label}
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
