import {
  Container,
  Dialog,
  DialogTitle,
  Box,
  IconButton,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { FormEmail } from "../components/form/FormEmail";
import { useForgotPassword } from "../hooks/api/users/useUsers";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const { control, handleSubmit } = useForm();

  const forgotPassword = useForgotPassword();
  const onSubmit = async (data) => {
    await forgotPassword.mutateAsync(data.email);
    toast("test", {
      type: "success",
    });
  };

  return (
    <Container>
      <Dialog
        open={!forgotPassword.isSuccess}
        maxWidth="sm"
        fullWidth
        fullScreen={isDownSm}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <IconButton onClick={() => navigate("/", { replace: true })}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box mb={2}>
              <Typography variant="title">
                {t("forgotPassword.title")}
              </Typography>
              <Typography variant="body2">
                {t("forgotPassword.description")}
              </Typography>
            </Box>

            <FormEmail control={control} name="email" label="Email" required />
          </DialogContent>
          <DialogActions>
            {forgotPassword.isSuccess && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{
                  px: 5,
                }}
                loading={forgotPassword.isPending}
              >
                {t("forgotPassword.button")}
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={!forgotPassword.isSuccess}
        maxWidth="sm"
        fullWidth
        fullScreen={isDownSm}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <IconButton onClick={() => navigate("/", { replace: true })}>
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Typography variant="title">{t("forgotPassword.title")}</Typography>
            <Typography variant="body1">
              {t("forgotPassword.success")}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/", { replace: true })}
            sx={{
              px: 5,
            }}
          >
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
