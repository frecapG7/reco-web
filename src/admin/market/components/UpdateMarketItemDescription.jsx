import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormTipTapEditor } from "../../../components/form/FormTipTapEditor";

export const UpdateMarketItemDescription = ({ marketItem, onSubmit }) => {
  const { control, reset, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const isUpSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    reset(marketItem);
  }, [marketItem, reset]);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit description</Button>
      <Dialog
        open={open}
        fullScreen={!isUpSm}
        fullWidth
        maxWidth="lg"
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Edit description</DialogTitle>
        <DialogContent>
          <FormTipTapEditor control={control} name="description" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleSubmit(onSubmit)();
              setOpen(false);
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
