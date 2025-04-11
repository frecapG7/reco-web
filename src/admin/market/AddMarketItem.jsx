import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import {
  usePostItem,
  useVerifyUniqueName,
} from "../../hooks/api/admin/useMarketAdministration";
import { useForm, useWatch } from "react-hook-form";
import { STORE_ITEM_TYPE } from "../../utils/enumUtils";
import { FormSelect } from "../../components/form/FormSelect";
import { FormEditor } from "../../components/form/FormEditor";
import { useState } from "react";
import { SelectLocale } from "../../i18n/SelectLocale";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FormText } from "../../components/form/FormText";
import { FormPrice } from "../../components/form/FormPrice";
import { FormSelectRequestType } from "../../components/form/FormSelectRequestType";

export const AddMarketItem = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [descriptionLang, setDescriptionLang] = useState("en");

  const navigate = useNavigate();
  const verifyUniqueName = useVerifyUniqueName();
  const postItem = usePostItem();

  const onSubmit = async (data) => {
    const result = await postItem.mutateAsync(data);
    toast.success("Item created successfully", {
      onClick: () => {
        navigate(`/admin/market/${result.id}`);
      },
    });

    reset({});
  };

  const type = useWatch({
    control,
    name: "type",
  });
  const a = useWatch({
    control,
  });

  return (
    <Container>
      <Typography variant="h4" mb={2}>
        Add new item
      </Typography>
      <Paper
        variant="brutalist1"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate={true}
      >
        <Stack width="100%" spacing={2} px={5}>
          <FormSelect
            control={control}
            options={Array.from(STORE_ITEM_TYPE, ([key, value]) => ({
              value: key,
              label: value.label,
            }))}
            name="type"
            required
            label="Item type"
          />
          <FormText
            control={control}
            name="name"
            label="Item name"
            rules={{
              required: true,
              validate: async (value) => {
                try {
                  await verifyUniqueName.mutateAsync(value);
                  return true;
                } catch (error) {
                  console.error(error);
                  return "Already used";
                }
              },
            }}
          />
          <FormText
            control={control}
            name="label"
            label="Item label"
            rules={{
              required: true,
            }}
          />
          <FormPrice
            control={control}
            name="price"
            label="Price"
            rules={{
              required: true,
              min: 1,
              max: 100,
            }}
          />
          <FormText
            control={control}
            label="Icon"
            name="icon"
            rules={{ required: true }}
          />
          <Zoom in={type === "ProviderItem"} unmountOnExit mountOnEnter>
            <Box width="100%">
              <FormSelectRequestType
                control={control}
                name="requestType"
                rules={{ required: true }}
              />
            </Box>
          </Zoom>
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
      </Paper>

      <pre>{JSON.stringify(errors)}</pre>
      <pre>{JSON.stringify(a)}</pre>
      <Backdrop open={postItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
