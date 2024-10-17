import { Grid, IconButton, Menu } from "@mui/material";
import { FormText } from "../../../components/form/FormText";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormSelect } from "../../../components/form/FormSelect";
import { useState } from "react";

export const IconFilters = ({ control, setValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <form>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <FormText
            control={control}
            name="search"
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setValue("search", "")}>
                  x
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <TuneOutlinedIcon fontSize="large" color="primary" />
          </IconButton>
        </Grid>
      </Grid>

      <Menu
        id="icons-filters-advanced"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        disableScrollLock
        marginThreshold={20}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <FormSelect
          label="Sorting"
          control={control}
          name="sort"
          options={[
            { label: "From cheapest to highest", value: "admin" },
            { label: "From more recent to old ones", value: "user" },
          ]}
        />
      </Menu>
    </form>
  );
};
