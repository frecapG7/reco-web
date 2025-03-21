import {
  Box,
  Container,
  Icon,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecommendation } from "../hooks/api/requests/useRecommendations";
import useI18nTime from "../hooks/i18n/useI18nTime";
import { useTranslation } from "react-i18next";
import { EnumIcon } from "../components/icons/EnumIcon";
import { REQUEST_TYPE } from "../utils/enumUtils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IFramely } from "../components/request/IFramely";
import { RecommendationProvider } from "../components/recommendation/RecommendationProvider";

export const RecommendationDetails = () => {
  const { id } = useParams();

  const { t } = useTranslation();
  const { formatDate } = useI18nTime();
  const { data: recommendation } = useGetRecommendation(id);

  const navigate = useNavigate();

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={() => navigate("/archives")}>
            <ArrowBackIcon />
          </IconButton>

          {recommendation ? (
            <Typography variant="title">{recommendation.field1}</Typography>
          ) : (
            <Skeleton variant="text" width={150} height={40} />
          )}
        </Box>

        {recommendation ? (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <RecommendationProvider provider={recommendation.provider} />
            <Icon variant="contained">
              <EnumIcon
                value={recommendation?.requestType}
                values={REQUEST_TYPE}
                fontSize="large"
              />
            </Icon>
          </Box>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
      </Box>
      <Paper variant="brutalist1">
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={2}
        >
          {recommendation ? (
            <IFramely html={recommendation?.html} />
          ) : (
            <Skeleton variant="rectangular" width={300} height={300} />
          )}

          <Paper variant="brutalist2" flexShrink={1} flexGrow={1} p={2}>
            <Typography variant="label" fontStyle="italic">
              {t("recommendation.createdBy")}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              align="right"
              gutterBottom
            >
              {recommendation?.user.name}
            </Typography>
            <Typography variant="label" fontStyle="italic">
              {t("recommendation.createdAt")}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              align="right"
              gutterBottom
            >
              {recommendation ? (
                formatDate(recommendation?.created_at)
              ) : (
                <Skeleton />
              )}
            </Typography>
            <Typography variant="label" align="left" fontStyle="italic">
              {t("recommendation.field1")}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="bold"
              align="right"
              gutterBottom
            >
              {recommendation?.field1}
            </Typography>
            <Typography variant="label" fontStyle="italic" align="left">
              {t("recommendation.field2")}
            </Typography>
            <Typography variant="body1" fontWeight="bold" align="right">
              {recommendation?.field2}
            </Typography>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};
