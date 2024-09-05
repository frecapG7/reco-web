import { Button, Skeleton, Stack, Tooltip } from "@mui/material";
import { useGetIconItems } from "../../hooks/api/market/useMarket";
import React from "react";
import { IconItemCard } from "../../components/store/IconItemCard";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useNavigate } from "react-router-dom";

export const HomeIconItemList = () => {
  const { data, isLoading } = useGetIconItems();

  const navigate = useNavigate();

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
        {data.results?.map((item, index) => (
          <React.Fragment key={index}>
            <IconItemCard item={item} />
          </React.Fragment>
        ))}

        <Tooltip title="View more">
          <Button variant="contained" onClick={() => navigate("icons")}>
            <ArrowForwardOutlinedIcon fontSize="large" />
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
};
