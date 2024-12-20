import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";
import { useController } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { i18nFormError } from "../../utils/i18n";

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
    rules: {
      required,
      ...rules,
    },
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      <FormLabel required={rules?.required}>{label}</FormLabel>
      <NumericFormat
        value={value}
        customInput={TextField}
        inputRef={ref}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        suffix={suffix}
      />
      <FormHelperText error>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};
