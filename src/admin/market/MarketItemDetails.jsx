import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Fade,
  IconButton,
  Paper,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetItem,
  useUpdateItem,
} from "../../hooks/api/admin/useMarketAdministration";
import useI18nTime from "../../hooks/i18n/useI18nTime";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";

import { confirm } from "../../components/utils/ConfirmationDialog";
import { STORE_ITEM_TYPE } from "../../utils/enumUtils";
import { EnumIcon } from "../../components/icons/EnumIcon";
import EditIcon from "@mui/icons-material/Edit";
import { CurrencyIcon } from "../../components/icons/CurrencyIcon";
import { UpdateMarketItem } from "./components/UpdateMarketItem";
import { toast } from "react-toastify";
import { ProductItem } from "../../components/store/items/ProductItem";

export const MarketItemDetails = () => {
  const { id } = useParams();

  const { formatDateTime } = useI18nTime();

  const { data: marketItem } = useGetItem(id);
  const [edit, setEdit] = useState(false);

  const updateItem = useUpdateItem(id, {
    onSuccess: () => toast.success("Item updated successfully"),
  });

  const onSubmit = (data) => {
    updateItem.mutate(data, {
      onSuccess: () => {
        setEdit(false);
      },
    });
  };

  const onEnable = () => {
    confirm({ description: "Are you sure you want to enable this item?" }).then(
      () =>
        updateItem.mutate({
          ...marketItem,
          enabled: true,
        })
    );
  };

  const onDisable = () => {
    confirm({
      description: "Are you sure you want to disable this item?",
    }).then(() =>
      updateItem.mutate({
        ...marketItem,
        enabled: false,
      })
    );
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        aria-label="admin-header-container"
        flexWrap="wrap"
        sx={{
          my: 2,
        }}
      >
        <Stack direction="column" alignItems="center">
          <Typography variant="label">Type</Typography>
          <EnumIcon
            value={marketItem?.type}
            values={STORE_ITEM_TYPE}
            fontSize="large"
          />
        </Stack>

        <Stack direction="column" alignItems="center">
          <Typography variant="label">Created By</Typography>

          <Typography>{marketItem?.created_by?.name}</Typography>
        </Stack>

        <Stack direction="column" alignItems="center">
          <Typography variant="label">Last modification</Typography>
          {marketItem?.modified_at && (
            <Typography>{formatDateTime(marketItem?.modified_at)}</Typography>
          )}
        </Stack>

        <Stack direction="column" alignItems="center">
          <Typography variant="label">Enabled</Typography>
          <IconButton>
            {marketItem?.enabled ? (
              <CheckCircleOutlineOutlinedIcon
                color="success"
                onClick={onDisable}
                fontSize="large"
              />
            ) : (
              <CancelOutlinedIcon
                color="error"
                onClick={onEnable}
                fontSize="large"
              />
            )}
          </IconButton>
        </Stack>
      </Box>

      <Box display="flex" gap={2}>
        <ProductItem product={marketItem} />
        <Collapse orientation="horizontal" collapsedSize={300}>
          <Paper variant="outlined">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={5}
            >
              <Fade in={!edit}>
                <Chip
                  color="primary"
                  label={marketItem?.price}
                  icon={<CurrencyIcon />}
                >
                  <CurrencyIcon />
                </Chip>
              </Fade>
              <IconButton variant="outlined" onClick={() => setEdit(!edit)}>
                {edit ? <CancelOutlinedIcon /> : <EditIcon />}
              </IconButton>
            </Box>
            <Zoom in={!edit} mountOnEnter unmountOnExit>
              <Stack divider={<Divider />} spacing={2} p={1}>
                <Stack>
                  <Typography variant="caption">Label</Typography>
                  <Typography variant="subtitle">
                    {marketItem?.label}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption">Name</Typography>
                  <Typography variant="body1">{marketItem?.name}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption">Icon</Typography>
                  <Typography noWrap maxWidth={200}>
                    {marketItem?.icon}
                  </Typography>
                </Stack>
              </Stack>
            </Zoom>
            <Zoom in={edit} mountOnEnter unmountOnExit>
              <Stack divider={<Divider />} spacing={2} p={1}>
                <UpdateMarketItem marketItem={marketItem} onSubmit={onSubmit} />
              </Stack>
            </Zoom>
          </Paper>
        </Collapse>
      </Box>

      <Backdrop open={updateItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
