import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post, put } from "../index";

const getUser = async (id) => {
  const response = await get(`/api/users/${id}`);
  return response;
};

export const useGetUser = (id, options) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    enabled: !!id && options?.enabled,
    ...options,
  });
};

const updateUser = async (id, data) => {
  const response = await put(`/api/users/${id}`, data);
  return response;
};

export const useUpdateUser = (id, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUser(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", id], data);
    },
    ...options,
  });
};

const updatePassword = async (id, data) => {
  const response = await put(`/api/users/${id}/password`, data);
  return response;
};

export const useUpdatePassword = (id, options) => {
  return useMutation({
    mutationFn: (data) => updatePassword(id, data),
    ...options,
  });
};

const signup = async (data, params) => {
  const response = await post("/api/users", data, {
    params,
  });
  return response;
};

export const useSignup = (options) => {
  return useMutation({
    mutationFn: ({ token, ...data }) =>
      signup(data, {
        ...(token && { token }),
      }),
    onSuccess: () => {},
    ...options,
  });
};

const getRequests = async (id, pageNumber, pageSize, params) => {
  const response = await get(`/api/users/${id}/requests`, {
    params: {
      pageNumber: pageNumber || 0,
      pageSize: pageSize || 1,
      ...params,
    },
  });
  return response;
};

export const useGetRequests = (id, pageSize, params, options) => {
  return useInfiniteQuery({
    queryKey: ["users", id, "requests", pageSize, params],
    queryFn: ({ pageParam }) => getRequests(id, pageParam, pageSize, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      return undefined;
    },
    ...options,
  });
};

const getRecommendations = async (id, pageNumber, pageSize, params) => {
  const response = await get(`/api/users/${id}/recommendations`, {
    params: {
      pageNumber: pageNumber || 0,
      pageSize: pageSize || 1,
      ...params,
    },
  });

  return response;
};

export const useGetRecommendations = (id, pageSize, params, options) => {
  return useInfiniteQuery({
    queryKey: ["users", id, "recommendations", pageSize, params],
    queryFn: ({ pageParam }) =>
      getRecommendations(id, pageParam, pageSize, params),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      return undefined;
    },
    ...options,
  });
};

const getLastPurchases = async (id) => {
  const response = await get(`/api/users/${id}/purchases`);
  return response;
};
export const useGetLastPurchases = (id, options) => {
  return useQuery({
    queryKey: ["users", id, "purchases"],
    queryFn: () => getLastPurchases(id),
    ...options,
  });
};

const getPurchases = async (id, filters, page, pageSize) => {
  const response = await get(`/api/users/${id}/purchases`, {
    params: {
      pageSize: pageSize || 1,
      pageNumber: page || 0,
      ...(filters?.name && { name: filters.name }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.status && { status: filters.status }),
    },
  });

  return response;
};

export const useGetPurchases = (id, filters, pageSize, options) => {
  return useInfiniteQuery({
    queryKey: ["users", id, "purchases", filters, pageSize],
    queryFn: ({ pageParam }) => getPurchases(id, filters, pageParam, pageSize),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      return undefined;
    },
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

const getMetrics = async (id) => {
  const response = await get(`/api/users/${id}/metrics`);
  return response;
};

export const useGetMetrics = (id, options) => {
  return useQuery({
    queryKey: ["users", id, "metrics"],
    queryFn: () => getMetrics(id),
    ...options,
  });
};

const getBalance = async (id, detailled) => {
  return await get(`/api/users/${id}/balance`, {
    params: {
      detailled,
    },
  });
};

export const useGetBalance = (id, detailled, options) => {
  return useQuery({
    queryKey: ["users", id, "balance", detailled],
    queryFn: () => getBalance(id, detailled),
    ...options,
  });
};

const getUserTokens = async (id, pageSize, pageNumber) => {
  const response = await get(`/api/users/${id}/tokens`, {
    params: {
      pageSize: pageSize || 10,
      pageNumber: pageNumber || 1,
    },
  });
  return response;
};

export const useGetUserTokens = (id, pageSize, pageNumber, options) => {
  return useQuery({
    queryKey: ["users", id, "tokens", pageSize, pageNumber],
    queryFn: () => getUserTokens(id, pageSize, pageNumber),
    ...options,
  });
};
