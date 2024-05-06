import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useController } from "react-hook-form";
import { getFormatLabel } from "./formUtils";

export const FormSelect = ({
  name,
  label,
  control,
  options,
  rules,
  required = false,
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: "",
    rules: { required, ...rules },
  });

  const formatLabel = getFormatLabel(label, required);

  return (
    <FormControl fullWidth>
      <InputLabel>{formatLabel}</InputLabel>
      <Select
        label={formatLabel}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputRef={ref}
        disabled={isSubmitting}
      >
        {options.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText error>{error?.message || error?.type}</FormHelperText>
    </FormControl>
  );
};
