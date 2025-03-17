import {
  FormControl,
  FormHelperText,
  ListItemIcon,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useController } from "react-hook-form";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

export const FormSelectRequestType = ({ control, name, rules }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    defaultValue: "",
    control,
    name,
    rules,
  });

  return (
    <FormControl fullWidth>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        <MenuItem value="">
          <Typography>All</Typography>
        </MenuItem>
        <MenuItem value="BOOK">
          <ListItemIcon>
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          <Typography>Book</Typography>
        </MenuItem>
        <MenuItem value="SONG">
          <ListItemIcon>
            <MusicNoteOutlinedIcon />
          </ListItemIcon>
          <Typography>Music</Typography>
        </MenuItem>
        <MenuItem value="MOVIE">
          <ListItemIcon>
            <MovieOutlinedIcon />
          </ListItemIcon>
          <Typography>Cinema</Typography>
        </MenuItem>
      </Select>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </FormControl>
  );
};
