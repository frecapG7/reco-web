import { Box, Skeleton, Stack, Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Display market product details
 * @param {*} param0
 * @returns
 */
export const StoreItem = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 2,
          padding: { xs: 4, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 250,
          maxHeight: 200,
          flexGrow: 1,
        }}
      >
        {item ? (
          <Box
            component="img"
            src={item?.icon}
            alt={item?.name}
            loading="lazy"
            sx={{
              display: "flex",
              maxWidth: 150,
            }}
          />
        ) : (
          <Skeleton variant="rectangular" width={200} height={200} />
        )}
      </Box>
      <Stack spacing={5} py={2} maxWidth={750}>
        {item ? (
          <Typography fontStyle="italic">"{item?.description}"</Typography>
        ) : (
          <Skeleton variant="text" width={500} />
        )}
        <Divider color="primary" />
        <Box display="flex" alignItems="flex-end">
          {item ? (
            <Typography>{t(`stores.products.${item?.type}.help`)}</Typography>
          ) : (
            <Skeleton variant="text" width={500} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};
