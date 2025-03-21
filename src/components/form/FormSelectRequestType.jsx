import {
  FormControl,
  FormHelperText,
  Icon,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useController } from "react-hook-form";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import { useTranslation } from "react-i18next";
import { i18nFormError } from "../../i18n/i18nForm";

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

  const { t } = useTranslation();

  return (
    <FormControl fullWidth>
      <Select
        component={Icon}
        value={value}
        variant="filled"
        onChange={(e) => onChange(e.target.value)}
      >
        {!rules?.required && (
          <MenuItem value="">
            <Typography>All</Typography>
          </MenuItem>
        )}
        <MenuItem value="BOOK">
          <Icon variant="contained">
            <MenuBookOutlinedIcon />
          </Icon>
        </MenuItem>
        <MenuItem value="SONG">
          <Icon variant="contained">
            <MusicNoteOutlinedIcon />
          </Icon>
        </MenuItem>
        <MenuItem value="MOVIE">
          <Icon variant="contained">
            <MovieOutlinedIcon />
          </Icon>
        </MenuItem>
      </Select>
      <FormHelperText error>{t(i18nFormError(error))}</FormHelperText>
    </FormControl>
  );
};
