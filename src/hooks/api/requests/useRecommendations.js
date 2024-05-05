import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getRecommendations = async (requestId) => {
  const response = await get(`/api/requests/${requestId}/recommendations`);
  return response;
};

export const useGetRecommendations = (requestId) => {
  return useQuery({
    queryKey: ["requests", requestId, "recommendations"],
    queryFn: () => getRecommendations(requestId),
  });
};
