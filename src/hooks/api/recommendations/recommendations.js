import { get } from "..";
import { useQuery } from "@tanstack/react-query";

const searchRecommencations = async (requestType, search) => {
  const response = await get("/api/recommendations", {
    params: {
      requestType,
      search,
      pageSize: 3,
    },
  });

  return response;
};

export const useSearchRecommendations = (requestType, search, options) => {
  return useQuery({
    queryKey: ["recommendations", requestType, search],
    queryFn: () => searchRecommencations(requestType, search),
    enabled: Boolean(requestType) && options?.enabled,
  });
};
