import { FormControl, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useController } from "react-hook-form";

export const FormToggles = ({
  control,
  name,
  label,
  options = [],
  rules,
  enforceValue = false,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormControl fullWidth>
      <ToggleButtonGroup
        fullWidth
        value={value}
        onChange={(e, value) => {
          if (enforceValue && !value) return;
          onChange(value);
        }}
        aria-label={label}
        error={error}
        exclusive
      >
        {options.map((option, i) => (
          <ToggleButton key={i} value={option.value}>
            {option.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
