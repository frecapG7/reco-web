import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { get, post } from "../index";

const create = async (userId, data) => {
  const response = await post(`/api/users/${userId}/purchases`, data);
  return response;
};

export const useCreatePurchase = (userId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => create(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", userId]);
    },
  });
};

const getPurchases = async (id, filters, page, pageSize) => {
  const response = await get(`/api/users/${id}/purchases`, {
    params: {
      pageSize: pageSize || 1,
      pageNumber: page || 0,
      ...filters,
    },
  });

  return response;
};

export const useGetPurchases = (id, filters, pageSize, pageNumber, options) => {
  return useQuery({
    queryKey: ["users", id, "purchases", filters, pageSize],
    queryFn: () => getPurchases(id, filters, pageNumber, pageSize),
    enabled: !!id && options?.enabled,
  });
};

const getPurchase = async (id, purchaseId) => {
  const response = await get(`/api/users/${id}/purchases/${purchaseId}`);
  return response;
};

export const useGetPurchase = (id, purchaseId, options) => {
  return useQuery({
    queryKey: ["users", id, "purchases", purchaseId],
    queryFn: () => getPurchase(id, purchaseId),
    ...options,
  });
};

const redeemPurchase = async (id, purchaseId) => {
  const response = await post(
    `/api/users/${id}/purchases/${purchaseId}/redeem`
  );
  return response;
};

export const useRedeemPurchase = (id, purchaseId, options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => redeemPurchase(id, purchaseId),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", id, "purchases"]);
    },
    ...options,
  });
};
