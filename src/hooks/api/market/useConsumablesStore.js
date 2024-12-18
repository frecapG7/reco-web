import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../index";
import { useAuthSession } from "../../../context/AuthContext";

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

const buyConsumableItem = async (userId, id, quantity) => {
  const response = await post(`/api/users/${userId}/purchases`, {
    item: {
      id,
    },
    quantity,
  });

  return response;
};

export const useBuyConsumableItem = (id) => {
  const { session } = useAuthSession();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (quantity) => buyConsumableItem(session.user?.id, id, quantity),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(["stores", "consumables"]),
        queryClient.invalidateQueries(["users", session.user?.id, "purchases"]),
      ]);
    },
  });
};
