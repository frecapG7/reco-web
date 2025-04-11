import { MenuItem, Select } from "@mui/material";

export const SelectLocale = ({ onChange, value }) => {
  return (
    <Select
      id="locale"
      name="locale"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "transparent",
      }}
    >
      <MenuItem value="en">en EN</MenuItem>
      <MenuItem value="fr">🇫🇷 FR</MenuItem>
    </Select>
  );
};
