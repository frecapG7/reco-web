import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid2 as Grid,
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
import { i18nDateTime } from "../../utils/i18n";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useState } from "react";

import { confirm } from "../../components/utils/ConfirmationDialog";
import { STORE_ITEM_TYPE } from "../../utils/enumUtils";
import { EnumIcon } from "../../components/icons/EnumIcon";
import { StoreItemDetails } from "../../components/store/items/StoreItemDetails";
import EditIcon from "@mui/icons-material/Edit";
import { CurrencyIcon } from "../../components/icons/CurrencyIcon";
import { UpdateMarketItem } from "./components/UpdateMarketItem";
import { UpdateMarketItemDescription } from "./components/UpdateMarketItemDescription";

export const MarketItemDetails = () => {
  const { id } = useParams();

  const { data: marketItem, isLoading } = useGetItem(id);

  const [edit, setEdit] = useState(false);

  const updateItem = useUpdateItem(id);

  const onSubmit = (data) => {
    updateItem.mutate(data, {
      onSuccess: () => {
        alert("Item updated successfully");
        setEdit(false);
      },
    });
  };

  const onEnable = () => {
    confirm({ description: "Are you sure you want to enable this item?" }).then(
      () =>
        updateItem.mutate(
          {
            ...marketItem,
            enabled: true,
          },
          {
            onSuccess: () => {
              alert("Item enabled successfully");
            },
          }
        )
    );
  };

  const onDisable = () => {
    confirm({
      description: "Are you sure you want to disable this item?",
    }).then(() =>
      updateItem.mutate(
        {
          ...marketItem,
          enabled: false,
        },
        {
          onSuccess: () => {
            alert("Item disabled successfully");
          },
        }
      )
    );
  };

  if (isLoading)
    return (
      <Container>
        <Box align="center">
          <CircularProgress />
        </Box>
      </Container>
    );

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
          <Typography>{marketItem.created_by?.name}</Typography>
        </Stack>

        <Stack direction="column" alignItems="center">
          <Typography variant="label">Last modification</Typography>
          <Typography>{i18nDateTime(marketItem.modified_at)}</Typography>
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

      <Grid
        container
        spacing={2}
        direction={{ xs: "column", md: "row-reverse" }}
      >
        <Grid size={{ xs: 12 }}>
          <Divider />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={5}
            >
              <Fade in={!edit}>
                <Typography variant="title">
                  {marketItem?.price} <CurrencyIcon />
                </Typography>
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
                    {marketItem.icon}
                  </Typography>
                </Stack>
              </Stack>
            </Zoom>
            <Zoom in={edit} mountOnEnter unmountOnExit>
              <Stack divider={<Divider />} spacing={2} p={1}>
                <UpdateMarketItem marketItem={marketItem} onSubmit={onSubmit} />

                <UpdateMarketItemDescription
                  marketItem={marketItem}
                  onSubmit={onSubmit}
                />
              </Stack>
            </Zoom>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <StoreItemDetails
            icon={marketItem.icon}
            type={marketItem.type}
            label={marketItem.label}
            name={marketItem.name}
            description={marketItem.description}
          />
        </Grid>
      </Grid>

      <Backdrop open={updateItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
