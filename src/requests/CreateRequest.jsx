import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { usePostRequest } from "../hooks/api/requests/useRequests";
import { useNavigate } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import { FormText } from "../components/form/FormText";
import { useTranslation } from "react-i18next";
import { FormEditor } from "../components/form/FormEditor";
import { FormSelectRequestType } from "../components/form/FormSelectRequestType";

export const CreateRequest = () => {
  const { control, handleSubmit } = useForm();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const postRequest = usePostRequest();

  const onSubmit = async (data) => {
    const result = await postRequest.mutateAsync(data);
    navigate(`../${result.id}`);
  };

  return (
    <Container>
      <Box display="flex" gap={2}>
        <Box flexGrow={3}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between"
            gap={1}
          >
            <Typography variant="title">
              {t("request.createRequest")}
            </Typography>
          </Box>
          <Paper variant="brutalist1">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Box flexGrow={1} mt={2}>
                <FormText
                  control={control}
                  name="title"
                  label={t("request.title")}
                  required
                  rules={{
                    maxLength: 255,
                  }}
                />
              </Box>
              <Box flexShrink={1} mx={2}>
                <FormSelectRequestType
                  control={control}
                  name="requestType"
                  rules={{ required: true }}
                />
              </Box>
            </Box>
            <FormEditor control={control} name="description" />

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                endIcon={<SendIcon />}
                loading={postRequest.isPending}
              >
                {t("request.submit")}
              </Button>
            </Box>
          </Paper>
        </Box>
        <Stack
          maxWidth={250}
          spacing={2}
          mt={5}
          display={{ xs: "none", lg: "flex" }}
        >
          <Typography variant="subtitle1">
            {t("request.createRequestHelp")}
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};
