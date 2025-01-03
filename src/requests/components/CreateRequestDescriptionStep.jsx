import { Box, Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormTipTapEditor } from "../../components/form/FormTipTapEditor";
import { FormText } from "../../components/form/FormText";

export const CreateRequestDescriptionStep = ({ onSubmit }) => {
  const { control, trigger } = useFormContext();

  return (
    <Box>
      <FormText control={control} name="title" label="Title" required />
      <FormTipTapEditor control={control} name="description" />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          onClick={async () => {
            const [validTitle, validDescription] = await Promise.all([
              trigger("title"),
              trigger("description"),
            ]);

            if (validTitle && validDescription) onSubmit();
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};
