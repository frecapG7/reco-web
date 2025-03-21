import {
  FormControl,
  FormHelperText,
  Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useController } from "react-hook-form";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
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
          <ListItemIcon>
            <WhatshotOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("Newest")} />
        </MenuItem>
        <MenuItem value="likes">
          <ListItemIcon>
            <ThumbUpOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("Likes")} />
        </MenuItem>
      </Select>
      <FormHelperText error>{t(i18nFormError(error))}</FormHelperText>
    </FormControl>
  );
};
