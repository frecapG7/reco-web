import { FormControl, FormLabel, IconButton, Stack } from "@mui/material";
import { FormNumber } from "./FormNumber";

export const FormPrice = ({ control, label, name, rules, ...props }) => {
  return (
    <FormNumber
      control={control}
      name={name}
      label={label}
      required={rules?.required}
      rules={rules}
      {...props}
    />
  );
};
