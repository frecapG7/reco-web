import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormSearch } from "../components/form/FormSearch";
import { useEffect } from "react";
import { FormToggles } from "../components/form/FormToggles";
import { RequestType } from "../components/request/RequestType";

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
        <FormSearch control={control} name="search" label="Search" />
        <FormToggles
          control={control}
          name="type"
          options={[
            {
              value: "BOOK",
              label: <RequestType requestType="BOOK" />,
            },
            {
              value: "SONG",
              label: <RequestType requestType="SONG" />,
            },
            {
              value: "MOVIE",
              label: <RequestType requestType="MOVIE" />,
            },
          ]}
        />
      </form>
    </Box>
  );
};
