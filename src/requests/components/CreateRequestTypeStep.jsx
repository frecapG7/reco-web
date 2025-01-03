import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormRadioCard } from "../../components/form/FormRadioCard";
import { REQUEST_TYPE } from "../../utils/enumUtils";

const options = Array.from(REQUEST_TYPE.entries()).map(([key, value]) => ({
  value: key,
  icon: value.icon,
  label: value.label,
}));

export const CreateRequestTypeStep = ({ onSubmit }) => {
  const { control } = useFormContext();

  return (
    <Box>
      <Box>
        <Typography variant="h4">What are you interested in ?</Typography>
      </Box>
      <FormRadioCard
        control={control}
        name="requestType"
        options={options}
        onValueChange={onSubmit}
      />
    </Box>
  );
};
