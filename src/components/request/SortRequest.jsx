import {
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useTranslation } from "react-i18next";

export const SortRequest = ({ sorting, setSorting }) => {
  const { t } = useTranslation();

  return (
    <FormControl size="small">
      <Select
        value={sorting}
        variant="outlined"
        onChange={(e) => setSorting(e.target.value)}
        renderValue={(value) =>
          value.sort === "created" ? (
            <WhatshotOutlinedIcon />
          ) : (
            <TrendingUpIcon />
          )
        }
      >
        <MenuItem
          value={{
            sort: "created",
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
            sort: "recommendationsCount",
            order: "desc",
          }}
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary={t("Trending")} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};
