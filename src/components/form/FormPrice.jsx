import { FormControl, FormHelperText, IconButton, Stack } from "@mui/material";
import { FormNumber } from "./FormNumber";
import { useController } from "react-hook-form";

export const FormPrice = ({ control, label, name, rules }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules,
    defaultValue: 0,
  });

  return (
    <FormControl fullWidth>
      <Stack direction="row" spacing={2}>
        <IconButton onClick={() => onChange(value - 1)}>-</IconButton>
        <FormNumber
          control={control}
          label={label}
          name={name}
          required={rules?.required}
          rules={rules}
        />
        <IconButton onClick={() => onChange(value + 1)}>+</IconButton>
      </Stack>
    </FormControl>
  );
};
