import { FormControl } from "@mui/material";
import { useController } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useTranslation } from "react-i18next";

export const FormEditor = ({
  control,
  name,
  rules,
  disabled = false,
  onLocaleChange,
}) => {
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
          toolbar: `undo | redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ${
            onLocaleChange ? "customButton" : ""
          }`,
          setup: (editor) => {
            editor.ui.registry.addMenuButton("customButton", {
              icon: "locale",
              tooltip: "Change language",
              fetch: (callback) => {
                const items = [
                  {
                    type: "menuitem",
                    text: "English",
                    value: "en",
                    onAction: () => onLocaleChange("en"),
                  },
                  {
                    type: "menuitem",
                    text: "French",
                    value: "fr",
                    onAction: () => onLocaleChange("fr"),
                  },
                ];
                callback(items);
              },
            });
          },
        }}
        disabled={disabled}
        value={value}
        onEditorChange={onChange}
        onBlur={() => {
          onChange(value);
        }}
      />
    </FormControl>
  );
};
