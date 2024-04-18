import { FormControl, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export const FormNumber = ({
  control,
  label,
  name,
  required,
  rules,
  suffix,
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
      <NumericFormat
        value={value}
        customInput={TextField}
        label={label}
        inputRef={ref}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error?.message || error?.type}
        required={required}
        suffix={suffix}
      />
    </FormControl>
  );
};
