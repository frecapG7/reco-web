import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { useController } from "react-hook-form";
import { errorMessage } from "./formUtils";

export const FormCheckbox = ({ name, label, control, rules,}) => {
  const {
    field: { onChange, value, onBlur, ref },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    rules: rules,
    defaultValue: false,
  });

  return (
    <FormControl fullWidth>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(value)}
            color="primary"
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
          />
        }
        disabled={isSubmitting}
        label={label}
      />
      <FormHelperText error>{errorMessage(error)}</FormHelperText>
    </FormControl>
  );
};
