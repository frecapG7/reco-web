import { ThemeProvider } from "@emotion/react";
import theme from "../../theme";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createRoot } from "react-dom/client";

export const confirm = ({ title = "Are you sure?", description = "" }) => {
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    const root = createRoot(container);
    document.body.appendChild(container);

    const onCancel = () => {
      root.unmount();
      document.body.removeChild(container);
      reject();
    };
    const onConfirm = () => {
      root.unmount();
      document.body.removeChild(container);
      resolve();
    };

    root.render(
      <ConfirmationDialog
        open
        title={title}
        description={description}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
  });
};

const ConfirmationDialog = ({
  open,
  onConfirm,
  onCancel,
  title = "Are you sure ?",
  description,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onCancel}
        aria-label="confirmation-dialog"
        scroll="body"
        maxWidth="sm"
        // fullWidth
      >
        <DialogTitle align="center">{title}</DialogTitle>
        <DialogContent align="center">{description}</DialogContent>
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
