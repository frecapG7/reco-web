import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Typography,
} from "@mui/material";

import TaskAltIcon from "@mui/icons-material/TaskAlt";

export const SuccessDialog = ({ open, onClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-label="success-dialog"
      scroll="body"
      maxWidth="sm"
      fullWidth
    >
      <DialogContent align="center">
        <Box align="center">
          <Icon
            sx={{
              width: { xs: 50, md: 150 },
              height: { xs: 50, md: 150 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "success.light",
            }}
          >
            <TaskAltIcon
              sx={{ fontSize: { xs: 40, md: 100 } }}
              color="primary"
            />
          </Icon>
          {/* <TaskAltRoundedIcon sx={{ fontSize: 100 }} color="success" /> */}
          <Typography variant="h6" color="success">
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
