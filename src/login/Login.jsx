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
import { useAuthSession } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signIn = useLogin();

  const onSubmit = (data) => {
    signIn.mutate(data, {
      onSuccess: (session) => {
        login(session);
        navigate("/", { replace: true });
      },
      onError: (error) => console.log(error),
    });
  };

  const formRef = useRef();

  const { session, login } = useAuthSession();

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

      <pre>{JSON.stringify(session)}</pre>
    </Container>
  );
};
