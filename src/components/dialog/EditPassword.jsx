import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  Button,
  Slide,
  Box,
  Divider,
  Fade,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormPassword } from "../form/FormPassword";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdatePassword } from "../../hooks/api/users/useUsers";

import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import { i18nFormError } from "../../i18n/i18nForm";

export const EditPassword = ({ open, onClose, user }) => {
  const { control, getValues, handleSubmit } = useForm();

  const newPassword = useWatch({
    control,
    name: "newPassword",
  });

  const updatePassword = useUpdatePassword(user?.id, {
    onSuccess: () => {
      setTimeout(() => {
        onClose();
      }, 1000);
    },
  });
  const onSubmit = async (data) => {
    await updatePassword.mutateAsync(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Password</DialogTitle>
      <DialogContent>
        <Fade in={updatePassword.isSuccess} mountOnEnter unmountOnExit>
          <Box display="flex" justifyContent="center">
            <TaskAltTwoToneIcon color="success" fontSize="large" />
          </Box>
        </Fade>

        <Fade in={!updatePassword.isSuccess} mountOnEnter unmountOnExit>
          <Stack spacing={2}>
            <FormPassword
              control={control}
              label="Previous Password"
              name="oldPassword"
              rules={{
                required: true,
              }}
            />

            <Divider />
            <FormPassword
              control={control}
              label="New Password"
              name="newPassword"
              rules={{ required: true }}
            />

            <Slide
              direction="down"
              in={Boolean(newPassword)}
              mountOnEnter
              unmountOnExit
            >
              <Box>
                <FormPassword
                  control={control}
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={{
                    required: true,
                    validate: (value) =>
                      value === getValues("newPassword") ||
                      "Passwords do not match",
                  }}
                />
              </Box>
            </Slide>
          </Stack>
        </Fade>
      </DialogContent>
      <DialogActions>
        <Box>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {updatePassword.isPending ? (
              <CircularProgress color="secondary" />
            ) : (
              <EditIcon />
            )}
          </Button>
          <Slide
            in={updatePassword.isError}
            direction="down"
            mountOnEnter
            unmountOnExit
          >
            <FormHelperText error>
              {i18nFormError(updatePassword.error)}
            </FormHelperText>
          </Slide>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
