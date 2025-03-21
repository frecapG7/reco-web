import {
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { i18nFormError } from "../../i18n/i18nForm";
import { useController } from "react-hook-form";

const acceptedUrls = [
  "youtube.com",
  "soundcloud.com",
  "vimeo.com",
  "deezer.com",
  "spotify.com",
  "bandcamp.com",
  "mixcloud.com",
  "wikipedia.org",
  "babelio.com",
  "discogs.com",
];

export const FormLink = ({
  control,
  name,
  label,
  placeholder,
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
        if (acceptedUrls.some((url) => value?.includes(url))) return true;
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
        placeholder={placeholder}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Fade in={!!value}>
                  <IconButton
                    onClick={() => {
                      onChange("");
                    }}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                </Fade>
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
          },
        }}
      />
    </FormControl>
  );
};
