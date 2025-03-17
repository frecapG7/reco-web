import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { usePostRequest } from "../hooks/api/requests/useRequests";
import { useNavigate } from "react-router-dom";

import SendIcon from "@mui/icons-material/Send";
import { FormText } from "../components/form/FormText";
import { FormTipTapEditor } from "../components/form/FormTipTapEditor";
import { useTranslation } from "react-i18next";

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
      <Box
        display="flex"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={1}
        mb={2}
      >
        <Typography variant="title">Create Request</Typography>
      </Box>
      <Paper variant="brutalist1">
        <FormText
          control={control}
          name="title"
          label={t("request.title")}
          required
        />
        <FormTipTapEditor control={control} name="description" />

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
    </Container>
  );
};
