import { Button, Dialog, Skeleton, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useNavigate } from "react-router-dom";
import { IconItemDetails } from "../components/IconItemDetails";
import { IconItemCard } from "../components/IconItemCard";
import { useGetTrendingIconItems } from "../../hooks/api/market/useIconsStore";

export const HomeIconItemList = () => {
  const { data, isLoading } = useGetTrendingIconItems();

  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);

  if (isLoading)
    return (
      <>
        <Stack direction="row" gap={2}>
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
      </>
    );

  return (
    <>
      <Stack direction="row" gap={2}>
        {data?.results?.map((item, index) => (
          <React.Fragment key={index}>
            <IconItemCard item={item} onClick={() => setSelectedItem(item)} />
          </React.Fragment>
        ))}

        <Tooltip title="View more">
          <Button variant="contained" onClick={() => navigate("icons")}>
            <ArrowForwardOutlinedIcon fontSize="large" />
          </Button>
        </Tooltip>
      </Stack>

      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        fullWidth
        maxWidth="sm"
      >
        <IconItemDetails item={selectedItem} />
      </Dialog>
    </>
  );
};
