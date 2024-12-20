import { EditorContent, useEditor } from "@tiptap/react";
import { TipTapEditorMenu } from "./TipTapEditorMenu";
import StarterKit from "@tiptap/starter-kit";

const TiptapEditor = ({ initialValue, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
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
    <div style={style} onBlur={() => onChange(editor.getHTML())}>
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
    </div>
  );
};

const style = {
  backgroundColor: "white",
  ".tiptap": {
    border: 0,
    minHeight: 200,
  },
  "&.tiptap": {
    border: 0,
    height: "200px",
  },
};

export default TiptapEditor;
