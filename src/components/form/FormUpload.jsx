import {
  Alert,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { useController } from "react-hook-form";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useCallback, useEffect, useRef, useState } from "react";
import { i18nFormError } from "../../utils/i18n";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const FormUpload = ({
  control,
  label,
  name,
  rules,
  accept = [],
  showPreview = false,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: "",
  });

  const [open, setOpen] = useState(false);

  const [preview, setPreview] = useState(null);

  const handleUpload = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  useEffect(() => {
    handleUpload(value);
  }, [value, handleUpload]);
  return (
    <FormControl fullWidth>
      <Zoom in={!value} mountOnEnter unmountOnExit>
        <Box aria-label="input-container">
          <Typography variant="body1">{label}</Typography>
          <Button
            variant="contained"
            color="primary"
            align="center"
            fullWidth
            onClick={() => setOpen(true)}
          >
            <CloudUploadOutlinedIcon fontSize="large" color="secondary" />
          </Button>
          {accept?.length > 0 && (
            <Box sx={{ mt: 2 }} aria-label="upload-input-accept-format">
              <Alert severity="warning">Only accept {accept}</Alert>
            </Box>
          )}
        </Box>
      </Zoom>
      <Zoom
        in={Boolean(value)}
        mountOnEnter
        unmountOnExit
        aria-label="preview-container"
      >
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <TextField
            value={value?.name}
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <Zoom in={showPreview} mountOnEnter unmountOnExit>
            <Box
              component="img"
              src={preview}
              sx={{
                border: "2px solid",
                borderColor: "secondary.main",
                borderRadius: 100,
                width: 150,
                height: 150,
                objectFit: "contain",
              }}
            />
          </Zoom>
          <IconButton
            variant="contained"
            color="warning"
            onClick={() => onChange("")}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
      </Zoom>
      <DropDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          onChange(data);
          setOpen(false);
        }}
        accept={accept}
      />

      <FormHelperText error>{i18nFormError(error)}</FormHelperText>
    </FormControl>
  );
};

const DropDialog = ({ open, onClose, onSubmit, accept = [] }) => {
  const onDrop = (files) => {
    if (files.length === 0) return;

    const file = files[0];
    if (!accept.includes(file.type)) {
      alert(`Invalid document type! Only ${accept} extensions are accepted`);
      return;
    }

    onSubmit(file);

    // const reader = new FileReader();
    // reader.onload = (e) => {
    //   onSubmit(e.target.result);
    // };
    // reader.readAsText(file);
  };

  const inputRef = useRef();

  return (
    <Dialog open={open} fullWidth maxWidth="md" onClose={onClose}>
      <DialogContent>
        <Box
          onDrop={(e) => {
            e.preventDefault();
            onDrop(e.dataTransfer.files);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          sx={{
            border: "2px dashed grey",
            padding: 2,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" onClick={() => inputRef.current?.click()}>
            Drag & Drop your .svg file here, or click to select one
          </Typography>
          <input
            type="file"
            accept=".svg"
            style={{ display: "none" }}
            onChange={(e) => onDrop(e.target.files)}
            ref={inputRef}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          <Typography variant="body1">Cancel</Typography>
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
