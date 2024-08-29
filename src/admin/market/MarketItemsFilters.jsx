import { Button, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormText } from "../../components/form/FormText";
import { FormSelect } from "../../components/form/FormSelect";

export const MarketItemsFilters = ({ filters, onValueChange }) => {
  const { control, watch } = useForm({
    defaultValues: filters,
  });

  const data = watch();
  useEffect(() => {
    onValueChange(data);
  }, [data, onValueChange]);

  return (
    <form>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12} md={5}>
          <FormText
            control={control}
            name="value"
            rules={{
              minLength: 2,
            }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <FormSelect
            control={control}
            name="type"
            options={[
              { label: "Icon", value: "IconItem" },
              { label: "Title", value: "TitleItem" },
            ]}
          />
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="baseline">
          <Button
            variant="contained"
            color="secondary"
            // onClick={handleSubmit(setFilters)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
