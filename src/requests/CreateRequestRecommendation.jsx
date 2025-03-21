import { Container, Zoom, Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useCreateRequestRecommendation } from "../hooks/api/requests/useRecommendations";
import { RecommendationForm } from "../components/recommendation/RecommendationForm";
import { IFramely } from "../components/request/IFramely";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const CreateRequestRecommendation = () => {
  const { request } = useOutletContext();
  const [recommendation, setRecommendation] = useState(null);
  const createRequestRecommendation = useCreateRequestRecommendation(
    request?.id
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await createRequestRecommendation.mutateAsync({
      ...recommendation,
      duplicate_from: recommendation.id,
    });
    toast.success(t("recommendationCreated"));
    navigate(`/requests/${request.id}`);
  };

  return (
    <Container>
      <Zoom in={!recommendation} unmountOnExit>
        <Box>
          <RecommendationForm
            requestType={request.requestType}
            onSubmit={setRecommendation}
            disabled={Boolean(recommendation)}
          />
        </Box>
      </Zoom>
      <Zoom in={Boolean(recommendation)}>
        <Stack spacing={2}>
          <IFramely html={recommendation?.html} />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CancelOutlinedIcon />}
              onClick={() => setRecommendation(null)}
            >
              {t("cancel")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              endIcon={<CancelOutlinedIcon />}
              onClick={onSubmit}
              loading={createRequestRecommendation.isPending}
            >
              {t("create")}
            </Button>
          </Box>
        </Stack>
      </Zoom>
    </Container>
  );
};
