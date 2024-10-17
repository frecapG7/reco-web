import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getIconItems = async ({ value = "", pageSize = 10, pageNumber = 1 }) => {
  const response = await get("/api/stores/icons", {
    params: {
      value,
      pageSize,
      pageNumber,
    },
  });
  return response;
};

// Deprecated
export const useGetIconItems = (value, pageSize, pageNumber) => {
  return useQuery({
    queryKey: ["stores", "icons", value, pageSize, pageNumber],
    queryFn: () => getIconItems({ value, pageSize, pageNumber }),
  });
};

const getItem = async (id) => {
  const response = await get(`/api/stores/items/${id}`);
  return response;
};
export const useGetItem = (id) => {
  return useQuery({
    queryKey: ["stores", "items", id],
    queryFn: () => getItem(id),
  });
};

const getVariousItems = () => {
  return [
    {
      name: "Invitation Token",
      type: "INVITATION",
      url: "https://storage.googleapis.com/reco_dev/icons/gift-svgrepo-com.svg",
      price: 20,
      description: "Invite a friend to join the community",
    },
  ];
};

export const useGetVariousItems = () => {
  return useQuery({
    queryKey: ["market", "various"],
    queryFn: getVariousItems,
  });
};

const getConsumableItems = async () => {
  const response = await get("/api/stores/consumables");
  return response;
};

export const useGetConsumableItems = () => {
  return useQuery({
    queryKey: ["stores", "consumables"],
    queryFn: getConsumableItems,
  });
};
