import { Skeleton, Stack } from "@mui/material";
import { useGetVariousItems } from "../../hooks/api/market/useMarket";
import React from "react";
import { IconItemCard } from "../../components/store/IconItemCard";

export const HomeVariousItemList = () => {
  const { data: iconItems, isLoading } = useGetVariousItems();

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
        {iconItems?.map((item, index) => (
          <React.Fragment key={index}>
            <IconItemCard item={item} />
          </React.Fragment>
        ))}
      </Stack>
    </>
  );
};
