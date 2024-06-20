import {
  Autocomplete,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useSearchRecommendations } from "../../../hooks/api/recommendations/recommendations";
import { useState } from "react";
import { ProviderIcon } from "../../icons/ProviderIcon";
import SearchIcon from "@mui/icons-material/Search";

export const SearchRecommendation = ({ requestType, onValueChange }) => {
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
            variant="filled"
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
            // sx={{
            //   "& .MuiFilledInput-root": {
            //     borderRadius: 1,
            //     "&:focus": {
            //       // width: "100%",
            //     },
            //   },
            //   backgroundColor: "background.paper",
            // }}
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
                <ProviderIcon providerName={option.provider} />
              </Grid>
            </Grid>
          </li>
        )}
        getOptionLabel={(option) => option.displayName}
        loading={isLoading}
        loadingText="Loading recommendations..."
        onInputChange={(e, v) => setSearchValue(v)}
        onChange={(e, data) => {
          data && onValueChange(data);
        }}
      />
    </FormControl>
  );
};
