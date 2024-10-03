import { Dialog, Skeleton, Stack } from "@mui/material";
import { useGetConsumableItems } from "../../hooks/api/market/useMarket";
import React, { useState } from "react";
import { StoreItemCard } from "../../components/store/StoreItemCard";
import { StoreItemDetails } from "../../components/store/StoreItemDetails";

export const HomeConsumableItemsList = () => {
  const { data: iconItems, isLoading } = useGetConsumableItems();

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
        {iconItems?.results.map((item, index) => (
          <React.Fragment key={index}>
            <StoreItemCard
              label={item.label}
              name={item.name}
              description={item.description}
              icon={item.icon}
              price={item.price}
              onClick={() => setSelectedItem(item)}
            />
          </React.Fragment>
        ))}
      </Stack>

      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        fullWidth
        maxWidth="sm"
      >
        <StoreItemDetails
          icon={selectedItem?.icon}
          name={selectedItem?.name}
          label={selectedItem?.label}
          price={selectedItem?.price}
          description={selectedItem?.description}
          onBuy={() => console.log("Buying", selectedItem)}
        />
      </Dialog>
    </>
  );
};
