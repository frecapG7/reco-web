import { FormControl } from "@mui/material";
import { useController } from "react-hook-form";

export const FormMask = ({ control, name, label, disabled, rules, mask }) => {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required, ...rules },
    defaultValue: "",
  });

  return <FormControl fullWidth disabled={disabled}></FormControl>;
};
