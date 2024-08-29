import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Zoom,
  Stack,
  CircularProgress,
  Divider,
} from "@mui/material";
import { FormText } from "../../components/form/FormText";
import { useForm } from "react-hook-form";
import { FormSelect } from "../../components/form/FormSelect";
import { FormPrice } from "../../components/form/FormPrice";
import { IconItemForm } from "./IconItemForm";
import { usePostItem } from "../../hooks/api/admin/useMarketAdministration";
import { FormUpload } from "../../components/form/FormUpload";
import { FormRichEditor } from "../../components/form/FormRichEditor";

export const AddMarketItem = () => {
  const { control, handleSubmit, watch, setValue } = useForm();

  const postItem = usePostItem();
  const onSubmit = (data) => {
    postItem.mutate(
      {
        data: data.body,
        image: data.image,
      },
      {
        onSuccess: () => {
          alert("Item created successfully");
        },
        onError: () => {
          alert("Error creating item");
        },
      }
    );
  };

  const data = watch();

  const type = watch("type");

  return (
    <Container>
      <pre>{JSON.stringify(data)}</pre>

      <Box aria-label="header"></Box>

      <Paper
        sx={{
          padding: 5,
          marginTop: 2,
        }}
      >
        <Stack spacing={2}>
          <Box aria-label="form-header">
            <Typography variant="label">
              What type of market item do you want to create ?
            </Typography>
            <FormSelect
              control={control}
              options={[
                { value: "TITLE", label: "User titles" },
                { value: "AVATAR", label: "Avatar" },
              ]}
              name="type"
              required
            />
            <Alert severity="info">
              The created item will be available in the market
            </Alert>
          </Box>

          <Grid item container spacing={2} p={5}>
            <Zoom in={type === "AVATAR"} mountOnEnter unmountOnExit>
              <Grid item container xs={12} sm={5}>
                <Grid item xs={12}>
                  <FormUpload
                    control={control}
                    name="image"
                    label="Upload an icon to use as user Avatar"
                    rules={{
                      required: true,
                    }}
                    accept={["image/svg+xml"]}
                    showPreview
                  />
                </Grid>
              </Grid>
            </Zoom>

            <Grid item xs={0} sm={2}>
              <Divider orientation="vertical" />
            </Grid>

            <Grid item container xs={12} sm={5} aria-label="form-body">
              <Grid item xs={12}>
                <FormText
                  control={control}
                  name="body.name"
                  label="Item name"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormPrice
                  control={control}
                  name="body.price"
                  label="Price"
                  rules={{
                    required: true,
                    min: 1,
                    max: 100,
                  }}
                />
              </Grid>
            </Grid>

            <Grid item container aria-label="form-body" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="label">Description</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormRichEditor
                  control={control}
                  name="body.description"
                  label="Description"
                  multiline
                  rows={10}
                  rules={{
                    required: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Paper>

      <Box
        align="center"
        sx={{
          mt: 5,
        }}
      >
        {!postItem.isPending && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </Button>
        )}
        {postItem.isPending && <CircularProgress />}
      </Box>
    </Container>
  );
};
