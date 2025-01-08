import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
} from "@mui/material";
import { FormEmail } from "../form/FormEmail";
import { useForm } from "react-hook-form";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateUser } from "../../hooks/api/users/useUsers";
import { useEffect } from "react";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";

export const EditEmail = ({ open, onClose, user }) => {
  const { control, reset, handleSubmit } = useForm();

  const updateUser = useUpdateUser(user?.id, {
    onSuccess: () => {
      setTimeout(() => {
        onClose();
      }, 1000);
    },
  });
  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const onSubmit = async (data) => await updateUser.mutateAsync(data);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Email</DialogTitle>
      <DialogContent>
        <Fade in={updateUser.isSuccess} mountOnEnter unmountOnExit>
          <Box display="flex" justifyContent="center">
            <TaskAltTwoToneIcon color="success" fontSize="large" />
          </Box>
        </Fade>
        <Fade in={updateUser.isIdle} mountOnEnter unmountOnExit>
          <Box>
            <FormEmail
              control={control}
              name="email"
              disabled={updateUser.isPending}
            />
          </Box>
        </Fade>
      </DialogContent>

      <DialogActions>
        {updateUser.isPending ? (
          <CircularProgress />
        ) : (
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            <EditIcon />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
