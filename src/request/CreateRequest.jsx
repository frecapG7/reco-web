import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormText } from "../components/form/FormText";
import { FormRequestType } from "../components/form/FormRequestType";

import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Fragment } from "react";
import { FormTags } from "../components/form/FormTags";
import { usePostRequest } from "../hooks/api/requests/useRequests";
import { useNavigate } from "react-router-dom";

export const CreateRequest = () => {
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {},
  });

  const navigate = useNavigate();
  const postRequest = usePostRequest();

  const onSubmit = (data) => {
    postRequest.mutate(data, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <Container>
      <Paper
        sx={{
          my: 5,
        }}
      >
        <form>
          <Stack spacing={5} direction="column" sx={{ p: 2 }}>
            <Paper variant="outlined">
              <Typography
                variant="title"
                gutterBottom
                textAlign="center"
                paragraph
              >
                What are you looking for ?
              </Typography>
              <FormRequestType
                control={control}
                name="requestType"
                label="Type"
                rules={{ required: true }}
              />
            </Paper>

            <Divider />

            <Paper
              variant="outlined"
              sx={{
                my: 5,
                backgroundColor: "tertiary.light",
              }}
            >
              <Typography
                variant="title"
                gutterBottom
                textAlign="center"
                paragraph
              >
                Describe your request in a few words
              </Typography>
              <FormText
                control={control}
                name="title"
                label="Title"
                rules={{
                  required: true,
                }}
              />

              <FormText
                control={control}
                name="description"
                label="Description"
                placeholder="Hi, I'm a huge fan of techno music and I've been looking for "
                multiline
                rows={4}
              />
            </Paper>

            <Divider />
            <Paper variant="outlined">
              <Typography paragraph fontStyle="italic">
                You can add tags to help people find your request
              </Typography>
              <FormTags control={control} name="tags" />
            </Paper>
          </Stack>
        </form>
      </Paper>

      <Box
        align="center"
        sx={{
          my: 5,
        }}
      >
        {postRequest.isLoading && <CircularProgress />}
        {!postRequest.isLoading && (
          <Badge
            badgeContent={
              <Fragment>
                5
                <MonetizationOnOutlinedIcon />
              </Fragment>
            }
            color="yellow"
            overlap="rectangular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </Badge>
        )}
      </Box>
    </Container>
  );
};
