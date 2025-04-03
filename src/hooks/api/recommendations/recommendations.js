import { get } from "..";
import { useQuery } from "@tanstack/react-query";

const searchRecommencations = async (
  requestType,
  search,
  pageSize,
  provider
) => {
  const response = await get("/api/recommendations", {
    params: {
      requestType,
      search,
      pageSize: pageSize || 3,
      ...(provider && { provider }),
    },
  });

  return response;
};

export const useSearchRecommendations = (
  requestType,
  search = "",
  pageSize,
  provider,
  options
) => {
  return useQuery({
    queryKey: ["recommendations", requestType, search, pageSize, provider],
    queryFn: () =>
      searchRecommencations(requestType, search, pageSize, provider),
    ...options,
  });
};

const getProviders = async (requestType = "") => {
  const response = await get("/api/recommendations/providers", {
    params: {
      requestType,
    },
  });
  return response;
};

export const useGetProviders = (requestType) => {
  return useQuery({
    queryKey: ["recommendations", "providers", requestType],
    queryFn: () => getProviders(requestType),
  });
};
