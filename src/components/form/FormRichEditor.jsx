import { FormControl, FormHelperText } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useController } from "react-hook-form";
import { i18nFormError } from "../../utils/i18n";

export const FormRichEditor = ({ control, name, rules, disabled }) => {
  const {
    field: { value, onChange },
    fieldState: { error, isSubmitting },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormControl fullWidth>
      <Editor
        // tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        init={{
          selector: "textarea",
          language: "fr_FR",
          promotion: false,
          statusbar: false,
          plugins: "autoresize code",
          min_height: 300,
        }}
        disabled={disabled || isSubmitting}
        value={value}
        onEditorChange={(newValue) => {
          onChange(newValue);
        }}
        onBlur={() => {
          onChange(value);
        }}
      />
      <FormHelperText error>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};
