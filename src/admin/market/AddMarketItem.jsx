import {
  Alert,
  Box,
  Button,
  Container,
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
import { usePostItem } from "../../hooks/api/admin/useMarketAdministration";
import { FormUpload } from "../../components/form/FormUpload";
import { FormRichEditor } from "../../components/form/FormRichEditor";

export const AddMarketItem = () => {
  const { control, handleSubmit, watch } = useForm();

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

  const type = watch("type");

  return (
    <Container>
      <Box aria-label="header"></Box>

      <Paper
        sx={{
          padding: 5,
          marginTop: 2,
        }}
      >
        <Stack spacing={5}>
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

          <Box
            aria-label="form-body-top"
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
            }}
          >
            <Zoom in={type === "AVATAR"}>
              <Paper
                variant="outlined"
                sx={{
                  padding: 2,
                  width: { xs: "100%", sm: "50%" },
                  height: 200,
                }}
              >
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
              </Paper>
            </Zoom>

            <Box aria-label="form-body-divider">
              <Divider orientation="vertical" color="primary" flexItem />
            </Box>
            <Paper
              aria-label="form-body-right"
              variant="outlined"
              sx={{
                padding: 2,
                width: { xs: "100%", sm: "50%" },
                height: 200,
              }}
            >
              <FormText
                control={control}
                name="body.name"
                label="Item name"
                required
              />
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
            </Paper>
          </Box>

          <Box aria-label="form-body-bottom">
            <Typography variant="label">Description</Typography>
            <Typography variant="body2" paragraph>
              To ensure that the icon appears attractive in the store, please
              add a detailed description. This will help users understand the
              context and appeal of the icon, making it more engaging and
              visually appealing.
            </Typography>
            <FormRichEditor
              control={control}
              name="body.description"
              // rules={{
              //   required: true,
              // }}
            />
          </Box>
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
