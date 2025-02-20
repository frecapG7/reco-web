import {
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormPassword } from "../components/form/FormPassword";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useResetPassword } from "../hooks/api/users/useUsers";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isDownSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { control, handleSubmit, reset } = useForm();
  const location = useLocation();

  useEffect(() => {
    reset({
      token: location?.state.token,
    });
  }, [location, reset]);

  const resetPassword = useResetPassword();
  const onSubmit = async (data) => {
    await resetPassword.mutateAsync(data);
    setTimeout(() => navigate("/login", { replace: true }), 2000);
  };

  return (
    <Container>
      <Dialog open={true} maxWidth="sm" fullWidth fullScreen={isDownSm}>
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
              <Typography variant="h2">{t("resetPassword.title")}</Typography>
              <Typography variant="body2">
                {t("resetPassword.description")}
              </Typography>
            </Box>
            <FormPassword
              control={control}
              name="newPassword"
              label="Password"
              rules={{
                required: true,
                minLength: 8,
                validate: {
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value) || "passwordFormat",
                  hasLowercase: (value) =>
                    /[a-z]/.test(value) || "passwordFormat",
                  hasNumber: (value) => /[0-9]/.test(value) || "passwordFormat",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              loading={resetPassword.isPending}
            >
              {t("resetPassword.button")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
