import { get } from "..";
import { useQuery } from "@tanstack/react-query";

const searchRecommencations = async (
  requestType,
  search,
  pageSize,
  pageNumber
) => {
  const response = await get("/api/recommendations", {
    params: {
      requestType,
      search,
      pageSize: pageSize || 3,
      pageNumber: pageNumber || 1,
    },
  });

  return response;
};

export const useSearchRecommendations = (
  requestType,
  search,
  pageSize,
  pageNumber,
  options
) => {
  return useQuery({
    queryKey: ["recommendations", requestType, search, pageSize, pageNumber],
    queryFn: () =>
      searchRecommencations(requestType, search, pageSize, pageNumber),
    enabled: Boolean(requestType) && options?.enabled,
  });
};
