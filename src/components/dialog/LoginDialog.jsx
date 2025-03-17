import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Zoom,
  Box,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { LoginForm } from "../user/LoginForm";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAuthSession } from "../../context/AuthContext";
import { useLogin } from "../../hooks/api/auth/useLogin";
import { Link } from "react-router-dom";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Logo } from "../utils/Logo";

export const LoginDialog = ({ open, onClose, onSuccess }) => {
  const { control, handleSubmit } = useForm();

  const { t } = useTranslation();

  const signIn = useLogin();
  const { login } = useAuthSession();

  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const onSubmit = (data) => {
    signIn.mutate(data, {
      onSuccess: (session) => {
        login(session);
        onSuccess();
      },
      onError: (error) => console.log(error),
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isDownSm}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        },
      }}
    >
      <DialogTitle>
        <Logo width={100} />
      </DialogTitle>
      <IconButton
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseOutlinedIcon />
      </IconButton>
      <DialogContent>
        <Zoom in={!signIn.isSuccess} mountOnEnter unmountOnExit>
          <Box>
            <LoginForm control={control} />
            <Stack mt={2} spacing={2}>
              <Link to="/forgot-password">{t("forgotPassword.link")}</Link>
              <Link to="/sign-up">{t("signup.button")}</Link>
            </Stack>
          </Box>
        </Zoom>
        <Zoom in={signIn.isSuccess} mountOnEnter unmountOnExit>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TaskAltIcon />
          </Box>
        </Zoom>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          loading={signIn.isPending}
        >
          {t("login")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
