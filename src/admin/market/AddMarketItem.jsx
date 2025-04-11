import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { usePostItem } from "../../hooks/api/admin/useMarketAdministration";
import { useForm, useWatch } from "react-hook-form";
import { STORE_ITEM_TYPE } from "../../utils/enumUtils";
import { FormSelect } from "../../components/form/FormSelect";
import { StoreItemForm } from "../../components/store/items/StoreItemForm";
import { FormEditor } from "../../components/form/FormEditor";
import { useState } from "react";
import { SelectLocale } from "../../i18n/SelectLocale";

export const AddMarketItem = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [descriptionLang, setDescriptionLang] = useState("en");

  const type = useWatch({
    control,
    name: "type",
  });

  const postItem = usePostItem();
  const onSubmit = (data) => {
    postItem.mutate(data, {
      onSuccess: () => {
        alert("Item created successfully");
      },
      onError: () => {
        alert("Error creating item");
      },
    });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormSelect
          control={control}
          options={Array.from(STORE_ITEM_TYPE, ([key, value]) => ({
            value: key,
            label: value.label,
          }))}
          name="type"
          required
        />
        <Alert severity="info">
          The created item will be available in the market
        </Alert>

        <Zoom in={!!type}>
          <Stack width="100%" spacing={2} my={5}>
            <StoreItemForm control={control} />
            <Divider />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={2}
            >
              <Typography>Description</Typography>
              <SelectLocale
                value={descriptionLang}
                onChange={setDescriptionLang}
              />
            </Box>

            <Collapse in={descriptionLang === "en"} unmountOnExit mountOnEnter>
              <FormEditor
                control={control}
                name="description.en"
                label="Description"
              />
            </Collapse>
            <Collapse in={descriptionLang === "fr"} unmountOnExit mountOnEnter>
              <FormEditor
                control={control}
                name="description.fr"
                label="Description"
              />
            </Collapse>

            <Box justifyContent="center" display="flex" mt={5}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                loading={postItem.isPending}
              >
                Save
              </Button>
            </Box>
          </Stack>
        </Zoom>
        <pre>{JSON.stringify(errors)}</pre>
      </Box>
      <Backdrop open={postItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
