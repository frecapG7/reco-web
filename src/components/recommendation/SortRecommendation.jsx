import {
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { useTranslation } from "react-i18next";

export const SortRecommendation = ({ sorting, setSorting }) => {
  const { t } = useTranslation();

  return (
    <FormControl size="small">
      <Select
        value={sorting}
        variant="outlined"
        onChange={(e) => setSorting(e.target.value)}
        renderValue={(value) =>
          value.sort === "created_at" ? (
            <WhatshotOutlinedIcon />
          ) : (
            <ThumbUpOutlinedIcon />
          )
        }
      >
        <MenuItem
          value={{
            sort: "created_at",
            order: "desc",
          }}
        >
          <ListItemIcon>
            <WhatshotOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("Newest")} />
        </MenuItem>
        <MenuItem
          value={{
            sort: "likesCount",
            order: "desc",
          }}
        >
          <ListItemIcon>
            <ThumbUpOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t("Likes")} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
