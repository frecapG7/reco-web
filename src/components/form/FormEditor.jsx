import { FormControl } from "@mui/material";
import { useController } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "react-i18next";

export const FormEditor = ({ control, name, rules, disabled = false }) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
  });

  const { i18n } = useTranslation();

  return (
    <FormControl fullWidth>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        init={{
          selector: "textarea",
          language: `${i18n.language}_${i18n.language.toUpperCase()}`,
          promotion: false,
          menubar: false,
          statusbar: false,
          plugins: "autoresize code",
          min_height: 300,
          convert_urls: false,
          content_css: "/css/tinymce.css",
          
        }}
        disabled={disabled}
        value={value}
        onEditorChange={onChange}
        onBlur={() => {
          onChange(value);
        }}
      ></Editor>
    </FormControl>
  );
};
