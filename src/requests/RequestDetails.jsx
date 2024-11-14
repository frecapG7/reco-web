import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetRequest } from "../hooks/api/requests/useRequests";
import { Request } from "../components/request/Request";
import { RequestDetailsRecommendations } from "./components/RequestDetailsRecommendations";

export const RequestDetails = () => {
  const { id } = useParams();

  const { data: request } = useGetRequest(id);

  return (
    <Container>
      <Box my={2} aria-label="request-detail-container">
        <Request request={request} />
      </Box>

      {request && (
        <Box my={2} aria-label="request-recocos-container">
          <RequestDetailsRecommendations request={request} />
        </Box>
      )}
    </Container>
  );
};
