import {
  Box,
  CircularProgress,
  Container,
  Fade,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import { Logo } from "../components/utils/Logo";
import { SignupForm } from "../components/user/SignupForm";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import { useCreateUser } from "../hooks/api/users/useUsers";

export const Signup = () => {
  const createUser = useCreateUser();

  const onSubmit = (data) => {
    createUser.mutate(
      { data, token: data.token },
      {
        onSuccess: () => console.log("Success"),
      }
    );
  };

  return (
    <Container
      fixed
      sx={{
        mt: 5,
      }}
    >
      <Box align="center" aria-label="logo">
        <Logo />
      </Box>

      <Slide
        in={!createUser.isSuccess}
        direction="down"
        timeout={500}
        unmountOnExit
        mountOnEnter
      >
        <Paper
          aria-label="signup-form"
          sx={{
            py: 5,
            // backgroundColor: "secondary.light",
          }}
        >
          <Fade in={createUser.isPending}>
            <Box align="center">
              <CircularProgress />
            </Box>
          </Fade>
          <Fade in={!createUser.isPending}>
            <Box>
              <SignupForm onSubmit={onSubmit} />
            </Box>
          </Fade>
        </Paper>
      </Slide>

      <Slide
        in={createUser.isSuccess}
        direction="up"
        timeout={500}
        unmountOnExit
        mountOnEnter
      >
        <Paper aria-label="signup-success" sx={{ p: 2 }}>
          <Box align="center">
            <TaskAltTwoToneIcon
              sx={{
                fontSize: 100,
                color: "success.main",
              }}
            />
            <Typography variant="h4" color="success">
              Success!
            </Typography>
            <Typography variant="body1">
              You have successfully signed up.
            </Typography>
          </Box>
        </Paper>
      </Slide>
    </Container>
  );
};
