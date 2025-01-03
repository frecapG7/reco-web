import {
  Box,
  CircularProgress,
  Container,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Zoom,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { CreateRequestTypeStep } from "./components/CreateRequestTypeStep";
import { createElement, useState } from "react";
import { CreateRequestDescriptionStep } from "./components/CreateRequestDescriptionStep";
import { CreateRequestBonusStep } from "./components/CreateRequestBonusStep";
import { CreateRequestTagsStep } from "./components/CreateRequestTagsStep";
import { usePostRequest } from "../hooks/api/requests/useRequests";
import { useNavigate } from "react-router-dom";

const steps = new Map([
  [
    "type",
    {
      label: "",
      component: CreateRequestTypeStep,
      nextStep: "description",
    },
  ],
  [
    "description",
    {
      label: "Body",
      component: CreateRequestDescriptionStep,
      nextStep: "tags",
    },
  ],
  [
    "tags",
    {
      label: "Tags",
      component: CreateRequestTagsStep,
    },
  ],
  [
    "bonus",
    {
      label: "Bonus",
      component: CreateRequestBonusStep,
    },
  ],
]);

export const CreateRequest = () => {
  const methods = useForm();

  const [activeStep, setActiveStep] = useState("type");
  const activeStepIndex = Array.from(steps.keys()).indexOf(activeStep);

  const navigate = useNavigate();
  const postRequest = usePostRequest();

  const onSubmit = (data) => {
    postRequest.mutate(data, {
      onSuccess: (result) => navigate(`../${result.id}`),
    });
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        gap={1}
      >
        <Box flex={2}>
          <Stepper activeStep={activeStepIndex} orientation="vertical">
            {Array.from(steps?.entries())
              // .filter((entry, index) => index < activeStepIndex)
              .map(([key, step]) => (
                <Step key={key}>
                  <StepButton onClick={() => setActiveStep(key)}>
                    <StepLabel>{step?.label}</StepLabel>
                  </StepButton>
                </Step>
              ))}
          </Stepper>
        </Box>
        <Box aria-label="step-content" flex={11}>
          <FormProvider {...methods} mountOnEnter unmountOnExit>
            <Zoom in={!postRequest.isPending} key={activeStep}>
              <Box
                sx={{
                  width: "100%",
                  height: 150,
                }}
              >
                {createElement(steps.get(activeStep)?.component, {
                  onSubmit: () => {
                    const nextStep = steps.get(activeStep)?.nextStep;
                    if (nextStep) {
                      setActiveStep(nextStep);
                    } else {
                      methods.handleSubmit(onSubmit)();
                    }
                  },
                })}
              </Box>
            </Zoom>

            <Zoom in={postRequest.isPending} mountOnEnter unmountOnExit>
              <Box display="flex" width="100%" justifyContent="center">
                <CircularProgress />
              </Box>
            </Zoom>
          </FormProvider>
        </Box>
      </Box>
    </Container>
  );
};
