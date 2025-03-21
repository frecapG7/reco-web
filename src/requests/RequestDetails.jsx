import { Box, Button, Stack } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { RequestDetailsRecommendations } from "./components/RequestDetailsRecommendations";

export const RequestDetails = () => {
  const { request } = useOutletContext();
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Box>
        <div dangerouslySetInnerHTML={{ __html: request.description }} />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("add-recommendation")}
      >
        Add recommendation
      </Button>

      {request && (
        <Box my={2} aria-label="request-recocos-container">
          <RequestDetailsRecommendations request={request} />
        </Box>
      )}
    </Stack>
  );
};
