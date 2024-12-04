import { FormControl, IconButton, Stack, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const FormSearch = ({
  name,
  label,
  control,
  rules,
  disabled,
  ...rest
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: rules,
    defaultValue: "",
  });

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
        helperText={i18nFormError(error)}
        variant="outlined"
        {...rest}
        slotProps={{
          input: {
            endAdornment: (
              <Stack direction="row">
                <IconButton>
                  <SearchOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => onChange("")}>x</IconButton>
              </Stack>
            ),
          },
        }}
      />
    </FormControl>
  );
};
