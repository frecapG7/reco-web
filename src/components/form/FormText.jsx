import { FormControl, TextField } from "@mui/material";
import { useController } from "react-hook-form";

export const FormText = ({
  name,
  label,
  control,
  multiline,
  rows,
  rules,
  required,
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
    <FormControl fullWidth>
      <TextField
        {...rest}
        fullWidth
        name={name}
        label={label}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error?.message || ""}
        required={required}
        multiline={multiline}
        rows={rows}
        minRows={rules?.minRows ? rules.minRows : 0}
        maxRows={rules?.maxRows ? rules.maxRows : 0}
      />
    </FormControl>
  );
};
