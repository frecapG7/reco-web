import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { i18nFormError } from "../../i18n/i18nForm";
import { useTranslation } from "react-i18next";

export const FormNumber = ({
  control,
  label,
  name,
  required,
  rules,
  suffix,
  disabled = false,
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

  const { t } = useTranslation();

  return (
    <FormControl fullWidth>
      <NumericFormat
        disabled={disabled}
        value={value}
        label={label}
        customInput={TextField}
        inputRef={ref}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        suffix={suffix}
      />
      <FormHelperText error>{t(i18nFormError(error))}</FormHelperText>
    </FormControl>
  );
};
