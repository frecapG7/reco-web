import { EditorContent, useEditor } from "@tiptap/react";
import { TipTapEditorMenu } from "./TipTapEditorMenu";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({ initialValue, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
    ],
    content: initialValue,
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
    <div onBlur={() => onChange(editor.getHTML())}>
      <TipTapEditorMenu editor={editor} />
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
      <link rel="stylesheet" href="/css/tiptap.css" />
    </div>
  );
};

export default TiptapEditor;
