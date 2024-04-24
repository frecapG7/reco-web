import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { LoginForm } from "../components/user/LoginForm";
import { useRef } from "react";
import icon from "../../public/icon.png";
import { useLogin } from "../hooks/api/auth/useLogin";

export const Login = () => {
  const login = useLogin();

  const onSubmit = (data) => {
    login.mutate(data, {
      onSuccess: () => console.log("success"),
      onError: (error) => console.log(error),
    });
  };

  const formRef = useRef();

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, m: 2 }}>
        <Box
          sx={{
            p: 5,
          }}
          align="center"
        >
          <Box component="img" src={icon} sx={{ width: 150 }} alt="logo" />

          <form noValidate>
            <LoginForm onSubmit={onSubmit} ref={formRef} />
          </form>
        </Box>
        <Box
          align="center"
          sx={{
            my: 5,
          }}
        >
          {login.isPending && <CircularProgress />}
          {!login.isPending && (
            <Button
              variant="contained"
              onClick={() => formRef.current?.submit()}
            >
              Login
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
