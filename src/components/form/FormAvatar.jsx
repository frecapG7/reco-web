import { Box, FormControl, Stack, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

export const FormAvatar = ({ control, name, rules }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: rules?.required,
      validate: (value) =>
        value.startsWith("https://storage.googleapis.com") ||
        "URL must start with storage.googleapis.com",
    },
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      <Stack spacing={2} direction={{ xs: "column" }} alignItems="center">
        <Box
          component="img"
          src={value}
          sx={{
            border: "2px solid",
            borderColor: "secondary.main",
            borderRadius: 100,
            width: 150,
            height: 150,
            objectFit: "contain",
          }}
        />

        <TextField
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={i18nFormError(error)}
          fullWidth
          color="secondary"
        />
      </Stack>
    </FormControl>
  );
};
