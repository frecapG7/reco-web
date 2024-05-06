import { Button, FormControl } from "@mui/material";
import { useController } from "react-hook-form";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";

export const FormUpload = ({ control, label, name, required }) => {
  const {
    field: { onChange, ref, value },
  } = useController({
    name,
    control,
    rules: { required },
    defaultValue: "",
  });

  return (
    <FormControl fullWidth>
      {!value && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => console.log("click")}
        >
          {label}
          <UploadOutlinedIcon fontSize="large" />
        </Button>
      )}
    </FormControl>
  );
};
