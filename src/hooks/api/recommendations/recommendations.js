import { get } from "..";
import { useQuery } from "@tanstack/react-query";

const searchRecommencations = async (requestType, search) => {
  const response = await get("/api/recommendations", {
    params: {
      requestType,
      search,
    },
  });

  return response;
};

export const useSearchRecommendations = (requestType, search) => {
  return useQuery({
    queryKey: ["recommendations", requestType, search],
    queryFn: () => searchRecommencations(requestType, search),
    enabled: Boolean(search) && Boolean(requestType),
  });
};
