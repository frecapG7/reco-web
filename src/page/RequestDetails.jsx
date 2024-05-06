import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useGetRequest } from "../api/requests";
import { useParams } from "react-router-dom";
import { Enum } from "../utils/Enum";
import { Recommendations } from "../recommendation/Recommendations";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Container } from "@mui/system";
import { useState } from "react";
import { Button } from "@mui/base";

export const RequestDetails = () => {
  const { id } = useParams();
  const { data: request, isLoading, error } = useGetRequest(id);

  const [expanded, setExpanded] = useState(true);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <pre>{JSON.stringify(request)}</pre>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }} aria-label="author" />
          }
          title={
            <Typography>
              John Doe{" "}
              <Enum value={request.requestType} enumName="REQUEST_TYPE" />
            </Typography>
          }
          action={
            <Button aria-label="actions" variant="contained">
              {" "}
              {request.status}
            </Button>
          }
        >
          toto l'asticot
        </CardHeader>
        <CardContent>
          <Typography>{request.description}</Typography>
        </CardContent>
        <CardActions></CardActions>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: 5,
            py: 5,
          }}
        >
          <Typography variant="title" gutterBottom>
            View {request.recommendationsCount} recommendations
          </Typography>
          <IconButton onClick={() => setExpanded(!expanded)}>
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Recommendations request={request} />
        </Collapse>
      </Card>

      <Paper elevation={2} sx={{ mt: 5 }} square>
        <Box justifyContent="center" alignItems="center">
          <Typography variant="title">
            <Enum value={request.requestType} enumName="REQUEST_TYPE" />
          </Typography>
        </Box>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Description</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper>
              <Typography variant="body" paragraph>
                {request.description}
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          mt: 5,
        }}
      >
        <Typography variant="title">Previous responses</Typography>
        {/* <Recommendations request={request} /> */}
      </Paper>
    </Container>
  );
};
