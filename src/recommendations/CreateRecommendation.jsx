import {
  Alert,
  Backdrop,
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { FormLink } from "../components/form/FormLink";
import { useEffect, useState } from "react";
import { IFramely } from "../components/request/IFramely";
import { useTranslation } from "react-i18next";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { FormToggles } from "../components/form/FormToggles";
import { RequestType } from "../components/request/RequestType";

import { useNavigate } from "react-router-dom";
import {
  useCreateRecommendation,
  useGetEmbedRecommendation,
} from "../hooks/api/requests/useRecommendations";
import { toast } from "react-toastify";

export const CreateRecommendation = () => {
  const {
    control,
    formState: { isValid },
    setValue,
  } = useForm({
    defaultValues: {
      requestType: "SONG",
    },
  });

  const requestType = useWatch({
    control,
    name: "requestType",
  });

  const url = useWatch({
    control,
    name: "url",
  });

  const { t } = useTranslation();
  const { data: embed, isLoading } = useGetEmbedRecommendation(url, {
    enabled: isValid,
  });

  const createRecommendation = useCreateRecommendation();

  const [recommendation, setRecommendation] = useState(null);
  useEffect(() => {
    if (embed)
      setRecommendation({
        ...embed,
        requestType,
      });
  }, [embed, setRecommendation]);

  const navigate = useNavigate();

  const onSubmit = async () => {
    await createRecommendation.mutateAsync(recommendation);
    toast.success("+ 1");
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <Container>
      <Stack aria-label="recommendation-form" spacing={2}>
        <FormToggles
          control={control}
          name="requestType"
          options={[
            {
              value: "BOOK",
              label: <RequestType requestType="BOOK" />,
            },
            {
              value: "SONG",
              label: <RequestType requestType="SONG" />,
            },
            {
              value: "MOVIE",
              label: <RequestType requestType="MOVIE" />,
            },
          ]}
          enforceValue
        />

        <FormLink
          control={control}
          name="url"
          label="URL"
          placeholder="Paste a link"
          required
          rules={{
            minLength: 2,
          }}
        />

        <Zoom in={Boolean(recommendation)}>
          <Badge
            badgeContent="New (+1)"
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                padding: 2,
                fontWeight: "bold",
              },
            }}
            invisible={recommendation?.id}
          >
            <Paper
              elevation={3}
              sx={{
                p: 5,
                width: "100%",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="title">
                  {recommendation?.field1}
                </Typography>
                <Typography variant="subtitle">
                  {recommendation?.field2}
                </Typography>
                <Box
                  display="flex"
                  width="100%"
                  sx={{
                    bgcolor: "background.paper",
                    my: 2,
                  }}
                >
                  <IFramely html={recommendation?.html} />
                </Box>
              </Box>
            </Paper>
          </Badge>
        </Zoom>

        <Zoom in={recommendation?.id} mountOnEnter unmountOnExit>
          <Alert severity="warning">{t("archives.alreadyExists")}</Alert>
        </Zoom>

        <Zoom in={Boolean(recommendation)}>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            px={5}
            gap={2}
          >
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<CancelOutlinedIcon />}
              onClick={() => {
                setValue("url", "");
                setRecommendation(null);
              }}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              loading={createRecommendation.isPending}
              onClick={onSubmit}
              disabled={recommendation?.id}
            >
              {t("create")}
            </Button>
          </Box>
        </Zoom>
      </Stack>

      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
