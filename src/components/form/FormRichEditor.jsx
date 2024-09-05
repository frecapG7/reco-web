import { FormControl, FormHelperText } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

export const FormRichEditor = ({ control, name, rules, rows = 10 }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      <textarea value={value} onChange={onChange} rows={rows}></textarea>
      <FormHelperText error>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};
