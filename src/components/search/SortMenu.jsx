import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const SortMenu = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{
          p: 0,
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {value}
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => onChange("created_asc")}>
          <ListItemIcon>
            <RestoreOutlinedIcon />
          </ListItemIcon>
          <Typography>Newest</Typography>
        </MenuItem>

        <MenuList>
          <MenuItem onClick={() => onChange("likes_desc")}>
            <ListItemIcon>
              <ThumbUpOutlinedIcon />
            </ListItemIcon>
            <Typography>Top</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
