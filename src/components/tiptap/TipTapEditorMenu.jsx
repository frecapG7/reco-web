import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const TipTapEditorMenu = ({ editor }) => {
  if (!editor) return null;

  const formats = [
    ...(editor.isActive("bold") ? ["bold"] : []),
    ...(editor.isActive("italic") ? ["italic"] : []),
    ...(editor.isActive("strike") ? ["strike"] : []),
  ];

  return (
    <Box
      display="flex"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        width: "100%",
      }}
    >
      <ToggleButtonGroup value={formats} aria-label="text formatting">
        <ToggleButton
          value="bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToggleButton>
        <ToggleButton
          value="italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToggleButton>
        <ToggleButton
          value="strike"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          U
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
