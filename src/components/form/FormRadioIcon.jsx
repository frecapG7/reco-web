import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useController } from "react-hook-form";

export const FormRadioIcon = ({ control, name, options = [] }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      <RadioGroup
        value={value}
        onChange={(e) =>
          value === e.target.value ? onChange("") : onChange(e.target.value)
        }
      >
        <Box display="flex" justifyContent="space-around" alignItems="center">
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={
                <Radio
                  icon={
                    <IconButton variant="outlined">
                      <Stack>
                        {option.icon}
                        <Typography variant="subtitle" align="center">
                          {option.label}
                        </Typography>
                      </Stack>
                    </IconButton>
                  }
                  checkedIcon={
                    <IconButton variant="contained">
                      <Stack>
                        {option.icon}
                        <Typography variant="subtitle" align="center">
                          {option.label}
                        </Typography>
                      </Stack>
                    </IconButton>
                  }
                />
              }
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
