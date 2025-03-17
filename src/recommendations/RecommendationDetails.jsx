import {
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetRecommendation } from "../hooks/api/requests/useRecommendations";
import { i18nDate } from "../i18n/i18nDate";

export const RecommendationDetails = () => {
  const { id } = useParams();

  const { data: recommendation, isLoading } = useGetRecommendation(id);

  if (isLoading)
    return (
      <Container>
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            //   alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            bgcolor="background.dark"
            p={2}
          >
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="50%" />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            //   alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            bgcolor="background.dark"
            p={2}
          >
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="50%" />
          </Box>
        </Stack>
      </Container>
    );
  return (
    <Container>
      <Stack spacing={2} px={5}>
        <Box>
          <Typography variant="label" fontStyle="italic">
            name
          </Typography>
          <Typography variant="body1" fontWeight="bold" align="right">
            {recommendation?.user.name}
          </Typography>
        </Box>

        <Box>
          <Typography variant="label" fontStyle="italic">
            Date
          </Typography>
          <Typography variant="body1" fontWeight="bold" align="right">
            {i18nDate(recommendation.created_at)}
          </Typography>
        </Box>
      </Stack>

      <Divider />

      <Stack spacing={2} p={5}>
        <Box>
          <Typography variant="label" align="left" fontStyle="italic">
            Titre
          </Typography>
          <Typography variant="body1" fontWeight="bold" align="right">
            {recommendation?.field1}
          </Typography>
        </Box>
        <Box>
          <Typography variant="label" fontStyle="italic" align="left">
            Auteur
          </Typography>
          <Typography variant="body1" fontWeight="bold" align="right">
            {recommendation?.field2}
          </Typography>
        </Box>
        <Box>
          <Typography variant="label" fontStyle="italic" align="left">
            Url
          </Typography>
          <Typography variant="body1" fontWeight="bold" align="right">
            {recommendation?.url}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};
