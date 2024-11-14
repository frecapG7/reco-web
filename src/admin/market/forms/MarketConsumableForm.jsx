import {
  Alert,
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { FormPrice } from "../../../components/form/FormPrice";
import { FormRichEditor } from "../../../components/form/FormRichEditor";
import { FormText } from "../../../components/form/FormText";
import { useForm } from "react-hook-form";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { FormSelect } from "../../../components/form/FormSelect";

export const MarketConsumableForm = forwardRef(
  ({ marketItem, onSubmit }, ref) => {
    MarketConsumableForm.displayName = "MarketConsumableForm";

    const { control, handleSubmit, reset, watch } = useForm();

    const icon = watch("icon");
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
              <Typography textAlign="center" variant="h3" gutterBottom>
                Appareance
              </Typography>
              <Typography paragraph>
                It is required to add a GCS link as icon for your consumable
                item.
              </Typography>
              <Zoom in={icon} unmountOnExit>
                <Box component="img" src={icon} alt="icon" width="100%" />
              </Zoom>
              <FormText
                control={control}
                name="icon"
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
              <Typography textAlign="center" variant="h3" gutterBottom>
                Details
              </Typography>
              <Stack spacing={2}>
                <Box aria-label="common-market-item-details-form">
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
                </Box>
                <Divider />
                <Box aria-label="consumable-market-item-details-form">
                  <FormSelect
                    control={control}
                    name="consumableType"
                    label="Type of consumable"
                    options={[{ value: "invitation", label: "Invitation" }]}
                    rules={{
                      required: true,
                      validate: (value) => {
                        //TODO: backend call to check if consumable type is not already implemented
                        if (value === "invitation") return true;
                      },
                    }}
                  />
                  <Alert severity="warning">
                    Please insure with support that consumable type has been
                    implemented
                  </Alert>
                </Box>
              </Stack>
            </Paper>
          </Stack>

          <Paper aria-label="form-body-bottom">
            <Typography textAlign="center" variant="h3">
              Description
            </Typography>
            <Typography variant="body2" paragraph>
              Provide a description of the consumable item Provide a description
              of the consumable item, including:
              <ul>
                <li>
                  <strong>Effect</strong>: Describe what the consumable item
                  does when used.
                </li>
                <li>
                  <strong>Duration</strong>: Specify how long the effect lasts.
                </li>
                <li>
                  <strong>Usage</strong>: Explain how the item is used.
                </li>
                <li>
                  <strong>Lore</strong>: Provide a backstory or lore for the
                  item.
                </li>
              </ul>
            </Typography>
            <FormRichEditor
              control={control}
              name="description"
              // rules={{
              //   required: true,
              // }}
            />
          </Paper>
        </Stack>
      </form>
    );
  }
);
