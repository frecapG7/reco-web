import { Box, Button, Divider, Stack } from "@mui/material";
import { Request } from "../../components/request/Request";
import { RecommendationDialog } from "../RecommendationDialog";
import { useState } from "react";
import { Recommendations } from "../Recommendations";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
export const RequestItem = ({ request }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Stack spacing={1}>
      <Request request={request} />

      <Divider />

      <Box>
        <Button
          aria-label="add-recoco"
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          my={4}
        >
          <AddCircleOutlineOutlinedIcon /> Add Recoco
        </Button>
      </Box>
      <Box>
        <Recommendations request={request} />
      </Box>

      <RecommendationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        request={request}
      />
    </Stack>
  );
};
