import {
  Box,
  Chip,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useRef } from "react";
import { useController } from "react-hook-form";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const FormTags = ({ control, name }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const addTag = (v) => {
    if (v === "") return;
    onChange([...value, v]);
    inputRef.current.value = "";
  };

  const removeTag = (index) => {
    onChange(value.filter((v, i) => i !== index));
  };

  const inputRef = useRef();

  return (
    <FormControl fullWidth>
      <Box alignItems="center" display="flex">
        <TextField inputRef={inputRef} />
        <IconButton
          onClick={() => addTag(inputRef.current?.value)}
          color="primary"
        >
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </Box>
      <Grid container display="flex" gap={2}>
        {value?.map((v, index) => (
          <Grid item key={index}>
            <Chip
              label={v}
              variant="outlined"
              onDelete={() => removeTag(index)}
            />
          </Grid>
        ))}
      </Grid>
    </FormControl>
  );
};
