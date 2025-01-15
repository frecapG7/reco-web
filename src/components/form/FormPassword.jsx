import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useController } from "react-hook-form";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { i18nFormError } from "../../i18n/i18nForm";

export const FormPassword = ({ control, name, label, rules, ...rest }) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Set show password to true while mouse is down, and false again when it is released
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 1000);
  };

  return (
    <FormControl fullWidth>
      <TextField
        {...rest}
        fullWidth
        name={name}
        label={label}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={i18nFormError(error)}
        required={rules?.required}
        type={showPassword ? "text" : "password"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </FormControl>
  );
};
