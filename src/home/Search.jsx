import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormText } from "../components/form/FormText";
import { useEffect } from "react";
import { FormToggles } from "../components/form/FormToggles";

export const Search = ({ filters, setFilters }) => {
  const { control, watch } = useForm({
    defaultValues: filters,
  });

  const search = watch();

  useEffect(() => {
    setFilters(search);
  }, [search, setFilters]);

  return (
    <Box>
      <form>
        <FormText control={control} name="search" label="Search" />
        <FormToggles
          control={control}
          name="type"
          label="Type"
          options={[
            {
              value: "BOOK",
              label: "Book",
            },
            {
              value: "SONG",
              label: "Song",
            },
            {
              value: "MOVIE",
              label: "Movie",
            },
          ]}
        />
      </form>
    </Box>
  );
};
