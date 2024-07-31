import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormText } from "../form/FormText";
import { useCallback, useEffect, useState } from "react";
import { useValidateToken } from "../../hooks/api/validate/useValidate";
import { FormPassword } from "../form/FormPassword";
import TaskAltTwoToneIcon from "@mui/icons-material/TaskAltTwoTone";
import { FormEmail } from "../form/FormEmail";

export const SignupForm = ({ onSubmit }) => {
  const { control, handleSubmit, setError, clearErrors, watch } = useForm();

  const token = watch("token");
  const [validToken, setValidToken] = useState(false);

  const { mutateAsync: validateToken, isPending } = useValidateToken();

  const handleValidateToken = useCallback(
    async (token) => {
      clearErrors("token");
      try {
        await validateToken(token);
        setValidToken(true);
      } catch (e) {
        console.error(e);
        setError("token", {
          type: "manual",
          message: "Invalid token",
        });
      }
    },
    [setError, clearErrors, validateToken]
  );

  useEffect(() => {
    clearErrors("token");
    if (token?.length === 8) {
      handleValidateToken(token);
    }
  }, [token, handleValidateToken, clearErrors]);

  return (
    <Stack spacing={1}>
      <Accordion elevation={0} expanded={!validToken}>
        <AccordionSummary>
          <Typography
            paragraph
            variant="title"
            textAlign="center"
            color={validToken ? "success" : "primary"}
          >
            Verify your invitation token
            {validToken && (
              <TaskAltTwoToneIcon color="success" fontSize="large" />
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid item container aria-label="token-form">
            <Slide
              in={!isPending}
              timeout={600}
              direction="right"
              unmountOnExit
              mountOnEnter
            >
              <Grid item container>
                <Grid item xs={12}>
                  <Typography variant="subtitle">
                    Rococo is a private social network. To join, you need an
                    invitation
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormText
                    control={control}
                    name="token"
                    rules={{ required: true }}
                  />
                </Grid>
              </Grid>
            </Slide>
            <Slide
              in={isPending}
              timeout={600}
              direction="right"
              unmountOnExit
              mountOnEnter
            >
              <Grid item xs={12}>
                <Typography variant="body2" textAlign="center">
                  <CircularProgress color="secondary" />
                </Typography>
              </Grid>
            </Slide>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Collapse in={validToken} timeout={600}>
        <Grid item container aria-label="sign-up-form">
          <Grid item xs={12}>
            <Typography variant="h6">Create your account</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormEmail control={control} name="email" label="Email" required />
          </Grid>
          <Grid item xs={12}>
            <FormText
              control={control}
              name="name"
              label="Username"
              rules={{
                required: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormPassword
              control={control}
              name="password"
              label="Password"
              rules={{ required: true }}
            />
          </Grid>

          <Grid item container xs={12} justifyContent="center">
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="secondary"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Stack>
  );
};
