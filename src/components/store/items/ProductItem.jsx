import {
  Box,
  Skeleton,
  Stack,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

/**
 * Display market product details
 * @param {*} param0
 * @returns
 */
export const ProductItem = ({ product }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <Box
        sx={{
          background: `linear-gradient(25deg, ${theme.palette.primary.main}, ${theme.palette.background.default})`,
          borderRadius: 2,
          padding: { xs: 4, md: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 200,
          maxHeight: 250,
          flexGrow: 1,
        }}
      >
        {product ? (
          <Box
            component="img"
            src={product?.icon}
            alt={product?.name}
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

      <Stack spacing={5} py={2} maxWidth={550}>
        {product ? (
          <Typography
            fontStyle="italic"
            component="div"
            dangerouslySetInnerHTML={{
              __html: product?.description?.[i18n.language],
            }}
          />
        ) : (
          <Skeleton variant="text" width={500} />
        )}
        <Divider />
        <Box display="flex" alignItems="flex-end">
          {product ? (
            <Typography>
              {t(`stores.products.${product?.type}.help`)}
            </Typography>
          ) : (
            <Skeleton variant="text" width={500} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};
