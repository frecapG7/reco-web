import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Zoom,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormText } from "../../../components/form/FormText";
import { useVerifyUniqueName } from "../../../hooks/api/admin/useMarketAdministration";
import { FormPrice } from "../../../components/form/FormPrice";
import { FormEditor } from "../../../components/form/FormEditor";
import { SelectLocale } from "../../../i18n/SelectLocale";

export const UpdateMarketItem = ({ marketItem, onSubmit, disabled }) => {
  const { control, handleSubmit, reset } = useForm();

  const [editDescription, setEditDescription] = useState(false);
  const [descriptionLang, setDescriptionLang] = useState("en");

  const verifyUniqueName = useVerifyUniqueName();

  useEffect(() => reset(marketItem), [marketItem, reset]);

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      width="100%"
      spacing={2}
    >
      <FormText
        control={control}
        name="name"
        label="Item name"
        rules={{
          required: true,
          validate: async (value) => {
            try {
              if (value !== marketItem.name)
                await verifyUniqueName.mutateAsync(value);
              return true;
            } catch (error) {
              console.error(error);
              return "Already used";
            }
          },
        }}
        disabled={disabled}
      />
      <FormText
        control={control}
        name="label"
        label="Item label"
        rules={{
          required: true,
        }}
        disabled={disabled}
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
        disabled={disabled}
      />
      <FormText
        control={control}
        label="Icon"
        name="icon"
        rules={{ required: true }}
        disabled={disabled}
      />

      <Button variant="outlined" onClick={() => setEditDescription(true)}>
        Edit description
      </Button>

      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </Box>

      <Dialog
        open={editDescription}
        onClose={() => setEditDescription(false)}
        slotProps={{
          paper: {
            component: "form",
            noValidate: true,
            onSubmit: handleSubmit(onSubmit),
          },
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <SelectLocale value={descriptionLang} onChange={setDescriptionLang} />
        </DialogTitle>
        <DialogContent>
          <Zoom in={descriptionLang === "en"} unmountOnExit mountOnEnter>
            <Box>
              <FormEditor
                control={control}
                name="description.en"
                label="Description"
              />
            </Box>
          </Zoom>
          <Zoom in={descriptionLang === "fr"} unmountOnExit mountOnEnter>
            <Box>
              <FormEditor
                control={control}
                name="description.fr"
                label="Description"
              />
            </Box>
          </Zoom>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDescription(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => setEditDescription(false)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
