import { FormControl, FormHelperText, Switch } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

export const FormSwitch = ({ control, name }) => {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <FormControl>
      <Switch edge="end" checked={value} onChange={onChange} />
      <FormHelperText error={invalid}>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};
