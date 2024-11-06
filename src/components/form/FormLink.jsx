import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import { i18nFormError } from "../../utils/i18n";
import { useController } from "react-hook-form";

export const FormLink = ({
  control,
  name,
  label,
  required,
  disabled = false,
}) => {
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required,
      pattern: {
        value: /^(http|https):\/\/[^ "]+$/,
        message: "Invalid URL",
      },
      validate: (value) => {
        if (value?.startsWith("http://") || value?.startsWith("https://")) {
          return true;
        }
        return "Invalid URL";
      },
    },
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
        error={!!error}
        helperText={i18nFormError(error)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  navigator.clipboard.readText().then((text) => {
                    onChange(text);
                  })
                }
              >
                <ContentPasteOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};
