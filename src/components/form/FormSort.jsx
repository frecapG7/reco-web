import {
  FormControl,
  FormHelperText,
  Icon,
  ListItemIcon,
  MenuItem,
  Select,
} from "@mui/material";
import { useController } from "react-hook-form";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTranslation } from "react-i18next";
import { i18nFormError } from "../../i18n/i18nForm";

export const FormSort = ({ control, name, rules }) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    defaultValue: "created",
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
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="created">
          {/* <ListItemIcon> */}
          <AccessTimeIcon />
          {/* </ListItemIcon> */}
        </MenuItem>
        <MenuItem value="likes">
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
        </MenuItem>
      </Select>
      <FormHelperText error>{t(i18nFormError(error))}</FormHelperText>
    </FormControl>
  );
};
