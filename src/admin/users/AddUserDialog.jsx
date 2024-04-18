import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRef } from "react";
import { UserForm } from "../../components/user/UserForm";

export const AddUserDialog = ({ open, onClose }) => {
  const formRef = useRef();

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth scroll="body">
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <UserForm ref={formRef} onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => formRef.current?.submit()}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
