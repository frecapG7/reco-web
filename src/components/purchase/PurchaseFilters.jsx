import { Divider, Grid2 as Grid } from "@mui/material";
import { FormRadioIcon } from "../form/FormRadioIcon";

import LocalDiningOutlinedIcon from "@mui/icons-material/LocalDiningOutlined";
import FaceRetouchingNaturalOutlinedIcon from "@mui/icons-material/FaceRetouchingNaturalOutlined";
import { FormSearch } from "../form/FormSearch";

export const PurchaseFilters = ({ control }) => {
  return (
    <Grid container alignItems="center" width="100%">
      <Grid size={{ xs: 8 }}>
        <FormSearch control={control} name="search" label="Search" />
      </Grid>
      <Grid size={{ xs: 12 }} container>
        <Grid size={{ xs: 12, sm: 2 }}>
          <FormRadioIcon
            control={control}
            name="type"
            options={[
              {
                value: "",
                label: "All",
              },
              {
                value: "ConsumablePurchase",
                icon: <LocalDiningOutlinedIcon />,
              },
              {
                value: "IconPurchase",
                icon: <FaceRetouchingNaturalOutlinedIcon />,
              },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 0, md: 2 }}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>TODO: sort</Grid>
      </Grid>
    </Grid>
  );
};
