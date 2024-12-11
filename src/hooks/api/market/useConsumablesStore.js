import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "../index";

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

const getConsumable = async (id) => {
  const response = await get(`/api/stores/consumables/${id}`);
  return response;
};
export const useGetConsumable = (id) => {
  return useQuery({
    queryKey: ["stores", "consumables", id],
    queryFn: () => getConsumable(id),
  });
};

const buyConsumableItem = async (id, quantity) => {
  const response = await post(`/api/stores/consumables/${id}/buy`, {
    quantity,
  });

  return response;
};

export const useBuyConsumableItem = (id) => {
  return useMutation({
    mutationFn: (quantity) => buyConsumableItem(id, quantity),
  });
};
