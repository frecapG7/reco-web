import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useController } from "react-hook-form";
import { getFormatLabel } from "./formUtils";
import { i18nFormError } from "../../utils/i18n";

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

  const formatLabel = label && getFormatLabel(label, required);

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

      <FormHelperText error>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};
