import { Box, Paper, Stack, Typography } from "@mui/material";
import { FormAvatar } from "../../../components/form/FormAvatar";
import { FormPrice } from "../../../components/form/FormPrice";
import { FormRichEditor } from "../../../components/form/FormRichEditor";
import { FormText } from "../../../components/form/FormText";
import { useForm } from "react-hook-form";
import { forwardRef, useEffect, useImperativeHandle } from "react";

export const MarketIconForm = forwardRef(({ marketItem, onSubmit }, ref) => {
  MarketIconForm.displayName = "MarketIconForm";

  const { control, handleSubmit, reset } = useForm();

  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
  }));

  useEffect(() => {
    reset(marketItem);
  }, [marketItem, reset]);

  return (
    <form>
      <Stack spacing={5}>
        <Stack
          aria-label="form-body-top"
          display="flex"
          alignItems="stretch"
          direction={{ xs: "column", sm: "row" }}
          gap={5}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              width: { xs: "100%", sm: "50%" },
            }}
          >
            <Typography textAlign="center" paragraph>
              Add a GCS link to the avatar
            </Typography>
            <FormAvatar
              control={control}
              name="url"
              rules={{ required: true }}
            />
          </Paper>

          <Paper
            aria-label="form-body-right"
            elevation={3}
            sx={{
              padding: 2,
              // width: { xs: "100%", sm: "50%" },
            }}
          >
            <Typography textAlign="center" gutterBottom>
              Avatar name & price
            </Typography>
            <FormText
              control={control}
              name="name"
              label="Item name"
              required
            />
            <FormText
              control={control}
              name="label"
              label="Item label"
              required
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
          </Paper>
        </Stack>

        <Box aria-label="form-body-bottom">
          <Typography variant="label">Description</Typography>
          <Typography variant="body2" paragraph>
            To ensure that the icon appears attractive in the store, please add
            a detailed description. This will help users understand the context
            and appeal of the icon, making it more engaging and visually
            appealing.
          </Typography>
          <FormRichEditor
            control={control}
            name="description"
            // rules={{
            //   required: true,
            // }}
          />
        </Box>
      </Stack>
    </form>
  );
});
