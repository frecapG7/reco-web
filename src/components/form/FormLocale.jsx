import { FormControl, MenuItem, Select } from "@mui/material";
import { useController } from "react-hook-form";

const englishFlag = String.fromCodePoint(0x1f1ec, 0x1f1e7);
const spanishFlag = String.fromCodePoint(0x1f1ea, 0x1f1f8);
const frenchFlag = String.fromCodePoint(0x1f1eb, 0x1f1f7);

export const FormLocale = ({ control, name, label, open }) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  });

  return (
    <FormControl fullWidth>
      <Select
        open={open}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          backgroundColor: "inherit",
        }}
      >
        <MenuItem value="en">{englishFlag}</MenuItem>
        <MenuItem value="es">{spanishFlag}</MenuItem>
        <MenuItem value="fr">{frenchFlag}</MenuItem>
      </Select>
    </FormControl>
  );
};
