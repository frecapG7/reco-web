import { FormControl } from "@mui/material";

import { useController } from "react-hook-form";
import TiptapEditor from "../tiptap/TipTapEditor.jsx";

export const FormTipTapEditor = ({ control, name }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth>
      <TiptapEditor initialValue={value} onChange={onChange} />
    </FormControl>
  );
};
