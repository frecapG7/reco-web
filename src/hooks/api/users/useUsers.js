import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post } from "../index";

const getUser = async (id) => {
  const response = await get(`/api/users/${id}`);
  return response;
};

export const useGetUser = (id, options) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    ...options,
  });
};

const signup = async (data) => {
  const response = await post("/api/users/signup", data);
  return response;
};

export const useSignup = (options) => {
  return useMutation({
    mutationFn: (data) => signup(data),
    onSuccess: () => {},
    ...options,
  });
};

const getSignupAvatars = async () => {
  return await get("/api/users/signup/avatars");
};
export const useGetSignupAvatars = (options) => {
  return useQuery({
    queryKey: ["signup", "avatars"],
    queryFn: getSignupAvatars,
    ...options,
  });
};

const getLastRequests = async (id) => {
  const response = await get(`/api/users/${id}/requests`);
  return response;
};

export const useGetLastRequests = (id, options) => {
  return useQuery({
    queryKey: ["users", id, "requests"],
    queryFn: () => getLastRequests(id),
    ...options,
  });
};

const getLastRecommendations = async (id) => {
  const response = await get(`/api/users/${id}/recommendations`);
  return response;
};

export const useGetLastRecommendations = (id, options) => {
  return useQuery({
    queryKey: ["users", id, "recommendations"],
    queryFn: () => getLastRecommendations(id),
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
    ...options,
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
