import { FormControl, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../i18n/i18nForm";
import { useTranslation } from "react-i18next";
export const FormText = ({
  name,
  label,
  control,
  multiline,
  rows,
  rules,
  required = false,
  disabled,
  placeholder,
  ...rest
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: rules?.required || required, ...rules },
    defaultValue: "",
  });

  const { t } = useTranslation();

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
        helperText={t(i18nFormError(error))}
        required={rules?.required || required}
        multiline={multiline}
        rows={rows}
        minRows={rules?.minRows ? rules.minRows : 0}
        maxRows={rules?.maxRows ? rules.maxRows : 0}
        placeholder={placeholder}
        variant="outlined"
        {...rest}
      />
    </FormControl>
  );
};
