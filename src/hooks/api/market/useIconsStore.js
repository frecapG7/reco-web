import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../index";

const buyIconItem = async (id) => {
  const response = post(`/api/stores/icons/${id}/buy`);
  return response;
};

export const useBuyIconItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => buyIconItem(id),
    onSuccess: () => {
      Promise.all([queryClient.invalidateQueries("stores")]).then(() => {});
    },
  });
};
