import { Box, Button, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormTags } from "../../components/form/FormTags";

export const CreateRequestTagsStep = ({ onSubmit }) => {
  const { control } = useFormContext();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      gap={2}
    >
      <Box>
        <Typography variant="h4">#Tags</Typography>
        <Typography variant="body2">
          Adding tags to your request will help categorize it and make it easier
        </Typography>
      </Box>
      <Box>
        <FormTags control={control} name="tags" />
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={onSubmit}>
          POST
        </Button>
      </Box>
    </Box>
  );
};
