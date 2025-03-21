import {
  Paper,
  Skeleton,
  Stack,
  Typography,
  Grid2 as Grid,
  Box,
} from "@mui/material";
import useI18nTime from "../../hooks/i18n/useI18nTime";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import { useTranslation } from "react-i18next";

export const PurchaseDetails = ({ purchase }) => {
  const { t } = useTranslation();
  const { formatDateTime } = useI18nTime();

  if (!purchase)
    return (
      <Grid container width="100%" spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Skeleton variant="rectangular" width={300} height={200} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Skeleton variant="text" width={300} />
          <Skeleton variant="text" width={300} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Paper variant="brutalist2">
            <Stack spacing={1} p={2}>
              <Skeleton variant="text" width={300} />
              <Skeleton variant="text" width={300} />
              <Skeleton variant="text" width={300} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    );
  return (
    <Grid container width="100%" spacing={2}>
      <Grid size={{ xs: 12, md: 4, lg: 3 }}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            borderRadius: 2,
            padding: { xs: 4, md: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 250,
            flexGrow: 1,
          }}
        >
          <Box
            component="img"
            src={purchase.icon}
            alt={purchase.name}
            loading="lazy"
            sx={{
              display: "flex",
              maxWidth: 200,
            }}
          />
          <Typography variant="title" textAlign="center">
            {purchase.name}
          </Typography>
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <div dangerouslySetInnerHTML={{ __html: purchase.item?.description }} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper variant="brutalist2">
          <Stack spacing={1} p={2}>
            <>
              <Typography variant="label" textAlign="left">
                {t("purchase.paymentDetails.date")}
              </Typography>
              <Typography fontWeight="bold" textAlign="right">
                {formatDateTime(purchase?.payment_details?.purchased_at)}
              </Typography>
            </>
            <>
              <Typography variant="label" textAlign="left">
                {t("purchase.paymentDetails.price")}
              </Typography>
              <Typography
                fontWeight="bold"
                textAlign="right"
                alignContent="center"
              >
                {purchase?.payment_details?.price} <DiamondRoundedIcon />
              </Typography>
            </>
            <>
              <Typography variant="label" textAlign="left">
                {t("purchase.quantity")}
              </Typography>
              <Typography fontWeight="bold" textAlign="right">
                {purchase.quantity}
              </Typography>
            </>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
