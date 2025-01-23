import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  MobileStepper,
  Slide,
  Typography,
} from "@mui/material";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import { useSignup } from "../hooks/api/users/useUsers";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { SignupUsernameStep } from "./components/SignupUsernameStep";
import { SignupTokenStep } from "./components/SignupTokenStep";
import { SignupAvatarStep } from "./components/SignupAvatarStep";
import { useNavigate } from "react-router-dom";
import gate_illustration1 from "../../public/gate_illustration1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";

const steps = [
  {
    name: "TokenStep",
    label: "signup.steps.token.label",
    component: <SignupTokenStep />,
  },
  {
    name: "UsernameStep",
    label: "signup.steps.token.information",
    component: <SignupUsernameStep />,
  },
  {
    name: "AvatarStep",
    label: "signup.steps.token.avatar",
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
      data,
      {
        onSuccess: () => console.log("Success"),
      }
    );
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

  const formRef = useRef();

  useEffect(() => {
    if (step !== 0) formRef.current.scrollIntoView({ behavior: "smooth" });
  }, [step]);
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
    <Container maxWidth="xl">
      <Grid container width="100%">
        <Grid
          size={{ xs: 12, sm: 4 }}
          sx={{
            backgroundColor: "primary.dark",
          }}
        >
          <Box
            component="img"
            src={gate_illustration1}
            alt="gate"
            sx={{
              width: { xs: "100%", sm: "100%%" },
              height: { xs: "100%", sm: "100%%" },
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid
          size={{ xs: 12, sm: 6 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          sx={{
            mx: { xs: 0, sm: 5 },
          }}
          ref={formRef}
        >
          <Slide in={step !== 0}>
            <Box
              component={Button}
              alignItems="center"
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "flex-start",
              }}
              justifyContent="flex-start"
              onClick={() => setStep(step - 1)}
            >
              <ArrowBackIcon />
              <Typography>{t("back")}</Typography>
            </Box>
          </Slide>
          <form>
            <Box>
              <FormProvider {...methods}>
                <Slide in direction="left" key={step}>
                  <Box>{steps[step]?.component}</Box>
                </Slide>
              </FormProvider>
            </Box>
          </form>
          <Box align="center" my={5}>
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
        </Grid>
      </Grid>

      <Box
        mt={5}
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
        alignItems="center"
        justifyContent="center"
      >
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={step}
        />
      </Box>
    </Container>
  );
};
