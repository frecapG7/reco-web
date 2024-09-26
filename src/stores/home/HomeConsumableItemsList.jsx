import { Skeleton, Stack } from "@mui/material";
import { useGetConsumableItems } from "../../hooks/api/market/useMarket";
import React from "react";
import { ConsumableItemCard } from "../../components/store/ConsumableItemCard";

export const HomeConsumableItemsList = () => {
  const { data: iconItems, isLoading } = useGetConsumableItems();

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
        {iconItems?.results.map((item, index) => (
          <React.Fragment key={index}>
            <ConsumableItemCard item={item} />
          </React.Fragment>
        ))}
      </Stack>
    </>
  );
};
