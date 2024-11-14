import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { IFramely } from "../request/IFramely";

export const RecommendationDetails = ({ recommendation }) => {
  return (
    <Stack aria-label="recommendation-container" spacing={2}>
      <IFramely html={recommendation.html} />
      <Accordion
        elevation={2}
        sx={{
          width: "100%",
        }}
      >
        <AccordionSummary>Details</AccordionSummary>
        <AccordionDetails>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                Title
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography noWrap>{recommendation?.field1}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                Author
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography noWrap>{recommendation?.field2}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                Provider
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Box
                component="img"
                src={recommendation?.provider?.icon}
                color="secondary"
              />
            </Grid>
            <Grid item xs={11}>
              <Typography noWrap>{recommendation?.provider?.name}</Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
