import { Autocomplete, FormControl, Grid, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { useSearchRecommendations } from "../../../hooks/api/recommendations/recommendations";
import { useState } from "react";
import { ProviderIcon } from "../../icons/ProviderIcon";

export const SearchRecommendation = ({
  control,
  label,
  name,
  requestType,
  onValueChange,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const { data: recommendations, isLoading } = useSearchRecommendations(
    requestType,
    searchValue
  );

  const {
    field: { onChange, value, onBlur },
  } = useController({
    name,
    control,
    defaulValue: "",
  });

  return (
    <FormControl fullWidth>
      <Autocomplete
        autoComplete
        blurOnSelect
        selectOnFocus={false}
        // disabled={isLoading}
        options={recommendations || []}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        filterOptions={(x) => x}
        noOptionsText="No recommendations found"
        renderInput={(params) => (
          <TextField
            variant="filled"
            label={label}
            onBlur={onBlur}
            FormHelperTextProps={{ error: true }}
            margin="normal"
            {...params}
          />
        )}
        renderOption={(props, option) => (
          <li key={option.id}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              onClick={() => console.log("toto")}
              sx={{
                cursor: "pointer",
                p: 1,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
              {...props}
            >
              <Grid item>{option.displayName}</Grid>
              <Grid item>
                <ProviderIcon providerName={option.provider} />
              </Grid>
            </Grid>
          </li>
        )}
        getOptionLabel={(option) => option.displayName}
        loading={isLoading}
        loadingText="Loading recommendations..."
        onInputChange={(e, v) => setSearchValue(v)}
        value={value}
        onChange={(e, data) => {
          onChange(data);
          onValueChange && onValueChange(data);
        }}
      />
    </FormControl>
  );
};
