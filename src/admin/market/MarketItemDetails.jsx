import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
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
import { IconItemDetail } from "../../components/store/IconItemDetail";
import { useMemo, useRef, useState } from "react";
import { MarketItemForm } from "./forms/MartketItemForm";

import { confirm } from "../../components/utils/ConfirmationDialog";
import { StoreItemIcon } from "../../components/store/StoreItemIcon";
import EditIcon from "@mui/icons-material/Edit";

export const MarketItemDetails = () => {
  const { id } = useParams();

  const { data: marketItem, isLoading } = useGetItem(id);

  const [edit, setEdit] = useState(false);

  const type = useMemo(() => {
    switch (marketItem?.type) {
      case "IconItem":
        return "ICON";
      default:
        return "";
    }
  }, [marketItem]);

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
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            aria-label="admin-header-container"
          >
            <Box align="center">
              <StoreItemIcon type={marketItem.type} fontSize="large" />
              <Typography variant="h5" paragraph>
                {marketItem.name}
              </Typography>
            </Box>

            <Typography variant="h6" paragraph>
              {marketItem.price} Piasses
            </Typography>

            <Stack direction="row" spacing={5}>
              {marketItem.type === "IconItem" && (
                <Stack direction="column" alignItems="center">
                  <Typography variant="label">Free on signup</Typography>
                  {JSON.stringify(marketItem.freeOnSignup)}
                  <IconButton onClick={handleFreeOnSignup}>
                    {marketItem?.freeOnSignup ? (
                      <CheckCircleOutlineOutlinedIcon
                        color="success"
                        fontSize="large"
                      />
                    ) : (
                      <CancelOutlinedIcon color="error" fontSize="large" />
                    )}
                  </IconButton>
                </Stack>
              )}

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
              <IconButton
                variant="contained"
                // color={edit ? "cancel.main" : "primary"}
                onClick={() => setEdit(!edit)}
              >
                {edit ? <CancelOutlinedIcon color="cancel" /> : <EditIcon />}
              </IconButton>
            </Stack>
          </Box>
          <Divider />

          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            aria-label="admin-metadata-container"
          >
            <Stack direction="column" alignItems="center">
              <Typography variant="label">Created By</Typography>
              <Typography>{marketItem.created_by?.name}</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Typography variant="label">Created at</Typography>
              <Typography>{i18nDateTime(marketItem.created_at)}</Typography>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Typography variant="label">Last modification</Typography>
              <Typography>{i18nDateTime(marketItem.modified_at)}</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <Zoom in={!edit} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            my: 5,
          }}
          aria-label="admin-item-detail"
        >
          <IconItemDetail
            iconItem={marketItem}
            onBuy={() => alert("You wanna play kid?")}
          />
        </Paper>
      </Zoom>

      <Zoom in={edit} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            my: 5,
          }}
          aria-label="admin-item-edit"
        >
          <MarketItemForm
            type={type}
            marketItem={marketItem}
            onSubmit={onSubmit}
            formRef={formRef}
          />

          <Box align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => formRef.current?.submit()}
            >
              Save
            </Button>
          </Box>
        </Paper>
      </Zoom>

      <Backdrop open={updateItem.isPending}>
        <CircularProgress />
      </Backdrop>
    </Container>
  );
};
