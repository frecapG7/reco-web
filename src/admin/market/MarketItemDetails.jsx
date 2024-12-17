import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Icon,
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
import { useRef, useState } from "react";
import { MarketItemForm } from "./forms/MartketItemForm";

import { confirm } from "../../components/utils/ConfirmationDialog";
import { STORE_ITEM_TYPE } from "../../utils/enumUtils";
import { EnumIcon } from "../../components/icons/EnumIcon";
import { StoreItemDetails } from "../../components/store/items/StoreItemDetails";
import EditIcon from "@mui/icons-material/Edit";
import { CurrencyIcon } from "../../components/icons/CurrencyIcon";
import { UpdateMarketItem } from "./components/UpdateMarketItem";

export const MarketItemDetails = () => {
  const { id } = useParams();

  const { data: marketItem, isLoading } = useGetItem(id);

  const [edit, setEdit] = useState(false);

  const formRef = useRef();

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

  const handleFreeOnSignup = () => {
    updateItem.mutate(
      {
        ...marketItem,
        freeOnSignup: !marketItem?.freeOnSignup,
      },
      {
        onSuccess: () => {
          alert("Item enabled successfully");
        },
      }
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
        aria-label="admin-container"
        sx={{
          my: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          aria-label="admin-header-container"
        >
          <Stack direction="column" alignItems="center">
            <Typography variant="label">Type</Typography>

            <EnumIcon
              value={marketItem.type}
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
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: "column", md: "row-reverse" }}
        px={5}
        gap={2}
      >
        <Paper>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Fade in={!edit}>
              <Typography variant="title">
                {marketItem?.price} <CurrencyIcon />
              </Typography>
            </Fade>
            <IconButton
              variant={edit ? "contained" : "outlined"}
              // color="secondary"
              onClick={() => setEdit(!edit)}
            >
              {edit ? <CancelOutlinedIcon /> : <EditIcon />}
            </IconButton>
          </Box>
          <Zoom in={!edit} mountOnEnter unmountOnExit>
            <Box display="flex" flexDirection="column" gap={2} p={2}>
              <Stack divider={<Divider />} spacing={2} p={2}>
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
                  <Typography>{marketItem.icon}</Typography>
                </Stack>
              </Stack>
            </Box>
          </Zoom>
          <Zoom in={edit} mountOnEnter unmountOnExit>
            <Box
              sx={{
                my: 5,
              }}
              aria-label="admin-item-edit"
            >
              <UpdateMarketItem marketItem={marketItem} onSubmit={onSubmit} />
            </Box>
          </Zoom>
        </Paper>
        <Box aria-label="details-container" flexGrow={{ xs: 1, md: 2 }}>
          <StoreItemDetails
            icon={marketItem.icon}
            type={marketItem.type}
            label={marketItem.label}
            name={marketItem.name}
            description={marketItem.description}
          />
        </Box>
      </Box>

      <Backdrop open={updateItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
