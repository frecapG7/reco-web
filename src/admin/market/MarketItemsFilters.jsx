import { Grid2 as Grid } from "@mui/material";
import { FormSelect } from "../../components/form/FormSelect";
import { FormSearch } from "../../components/form/FormSearch";

export const MarketItemsFilters = ({ control }) => {
  return (
    <Grid container spacing={5} alignItems="center">
      <Grid size={{ xs: 12, md: 5 }}>
        <FormSearch
          control={control}
          name="search"
          rules={{
            minLength: 2,
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <FormSelect
          control={control}
          name="type"
          options={[
            { label: "Icon", value: "IconItem" },
            { label: "Title", value: "TitleItem" },
          ]}
        />
      </Grid>
    </Grid>
  );
};
