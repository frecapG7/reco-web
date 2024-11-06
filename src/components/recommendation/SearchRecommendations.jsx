import { FormControl } from "@mui/material";
import { Autocomplete, Grid, IconButton, TextField, Box } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchRecommendations } from "../../hooks/api/recommendations/recommendations";

export const SearchRecommendations = ({ requestType, onChange = () => {} }) => {
  const [searchValue, setSearchValue] = useState("");
  const { data: recommendations, isLoading } = useSearchRecommendations(
    requestType,
    searchValue
  );

  return (
    <FormControl fullWidth>
      <Autocomplete
        fullWidth
        autoComplete
        blurOnSelect
        autoFocus
        disablePortal
        selectOnFocus={false}
        // disabled={isLoading}
        options={recommendations || []}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        filterOptions={(options) => options}
        noOptionsText="No recommendations found"
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            FormHelperTextProps={{ error: true }}
            margin="normal"
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
              ...params.InputProps,
            }}
          />
        )}
        renderOption={(props, option) => (
          <li key={props.id}>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              onClick={props.onClick}
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
                <Box component="img" src={option?.provider?.icon} />
              </Grid>
            </Grid>
          </li>
        )}
        getOptionLabel={(option) => option.displayName}
        loading={isLoading}
        loadingText="Loading recommendations..."
        onInputChange={(e, v) => setSearchValue(v)}
        onChange={(e, data) => {
          data && onChange(data);
        }}
      />
    </FormControl>
  );
};
