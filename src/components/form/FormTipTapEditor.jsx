import { FormControl, TextField } from "@mui/material";

import { useController } from "react-hook-form";
import { useEditor } from "@tiptap/react";

import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export const FormTipTapEditor = ({ control, name }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
    ],
    content: "",
    /**
     * This option gives us the control to enable the default behavior of rendering the editor immediately.
     */
    immediatelyRender: true,
    /**
     * This option gives us the control to disable the default behavior of re-rendering the editor on every transaction.
     */
    shouldRerenderOnTransaction: false,
    injectCSS: false,
  });
  return (
    <FormControl fullWidth>
      <TextField
        slotProps={{
          input: (
            <EditorContent
              editor={editor}
              style={{
                minHeight: 200,
                border: 0,
                "&.tiptap": {
                  height: "200px",
                  "&.ProseMirror-focus": {
                    border: 0,
                  },
                },
              }}
            />
          ),
          inputProps: { initialValue: value, onChange: onChange },
        }}
        multiline
        rows={10}
      />
    </FormControl>
  );
};
