import { Box } from "@mui/material";
import { FormSearch } from "../../components/form/FormSearch";
import { FormToggles } from "../../components/form/FormToggles";
import { RequestType } from "../../components/request/RequestType";

export const SearchRequestFilterForm = ({ control }) => {
  return (
    <Box>
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
    </Box>
  );
};
