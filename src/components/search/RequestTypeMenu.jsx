import {
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState } from "react";

import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

export const RequestTypeMenu = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        sx={{
          p: 0,
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {value === "" ? "All" : value}
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuList>
          <MenuItem onClick={() => onChange("")}>
            <Typography>All</Typography>
          </MenuItem>
          <MenuItem onClick={() => onChange("BOOK")}>
            <ListItemIcon>
              <MenuBookOutlinedIcon />
            </ListItemIcon>
            <Typography>Book</Typography>
          </MenuItem>

          <MenuItem onClick={() => onChange("SONG")}>
            <ListItemIcon>
              <MusicNoteOutlinedIcon />
            </ListItemIcon>
            <Typography>Song</Typography>
          </MenuItem>

          <MenuItem onClick={() => onChange("MOVIE")}>
            <ListItemIcon>
              <MovieOutlinedIcon />
            </ListItemIcon>
            <Typography>Movie</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
