import { Grid2 as Grid, IconButton, Menu } from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { FormSelect } from "../../../components/form/FormSelect";
import { useState } from "react";
import { FormSearch } from "../../../components/form/FormSearch";

export const IconFilters = ({ control }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Grid container spacing={2} alignItems="center" width="100%">
      <Grid size={{ xs: 8 }}>
        <FormSearch control={control} name="search" />
      </Grid>
      <Grid item xs={4}>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <TuneOutlinedIcon fontSize="large" color="primary" />
        </IconButton>
      </Grid>

      <Menu
        id="icons-filters-advanced"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        disableScrollLock
        // marginThreshold={20}
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
            { label: "Date", value: "admin" },
            { label: "Price", value: "user" },
          ]}
        />
        <FormSelect
          label="Order"
          control={control}
          name="order"
          options={[
            { label: "Croissant", value: "asc" },
            { label: "Décroissant", value: "desc" },
          ]}
        />
      </Menu>
    </Grid>
  );
};
