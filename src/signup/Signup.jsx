import {
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSignup } from "../hooks/api/users/useUsers";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { SignupUsernameStep } from "./components/SignupUsernameStep";
import { SignupPasswordStep } from "./components/SignupPasswordStep";
import { SignupTokenStep } from "./components/SignupTokenStep";
import { SignupAvatarStep } from "./components/SignupAvatarStep";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    name: "TokenStep",
    label: "Enter your token",
    component: <SignupTokenStep />,
  },
  {
    name: "UsernameStep",
    label: "Define your username",
    component: <SignupUsernameStep />,
  },
  {
    name: "PasswordStep",
    label: "Create a password",
    component: <SignupPasswordStep />,
  },
  {
    name: "AvatarStep",
    label: "Pick your avatar",
    component: <SignupAvatarStep />,
  },
];

export const Signup = () => {
  const [step, setStep] = useState(0);

  const methods = useForm({
    reValidateMode: "onBlur",
  });
  const signup = useSignup();

  const onSubmit = (data) => {
    signup.mutate(
      { data, token: data.token },
      {
        onSuccess: () => console.log("Success"),
      }
    );
  };

  const navigate = useNavigate();

  if (signup.isSuccess)
    return (
      <Container
        fixed
        sx={{
          my: 10,
        }}
      >
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

          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Container>
    );

  return (
    <Container
      fixed
      sx={{
        my: 10,
      }}
    >
      <Stack spacing={1}>
        <Box align="center">
          <Typography variant="title">
            {step + 1}/{steps.length} {steps[step]?.label}
          </Typography>
        </Box>

        <form>
          <Paper
            sx={{
              backgroundColor: "background.default",
              borderRadius: 3,
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Fade in={step !== 0}>
              <IconButton onClick={() => setStep(step - 1)}>
                <ArrowBackIcon />
              </IconButton>
            </Fade>
            <FormProvider {...methods}>
              <Slide in direction="left" key={step}>
                <Box align="center" width="100%">
                  {steps[step]?.component}
                </Box>
              </Slide>
            </FormProvider>
          </Paper>
        </form>

        <Box align="center">
          <Button
            variant="contained"
            onClick={() => {
              if (step === steps.length - 1) methods.handleSubmit(onSubmit)();
              else
                methods.trigger().then((valid) => {
                  if (valid) setStep(step + 1);
                });
            }}
          >
            {step === steps.length - 1 ? "Submit" : "Continue"}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
