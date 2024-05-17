import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../index";

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

const postRecommendation = async (requestId, recommendation) => {
  const response = await post(
    `/api/requests/${requestId}/recommendations/`,
    recommendation
  );
  return response;
};

export const usePostRecommendation = (requestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postRecommendation(requestId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["requests", requestId, "recommendations"],
      }),
  });
};

const likeRecommendation = async (requestId, recommendationId) => {
  const response = await post(
    `/api/requests/${requestId}/recommendations/${recommendationId}/like`
  );
  return response;
};

export const useLikeRecommendation = (requestId, recommendationId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => likeRecommendation(requestId, recommendationId),
    onSuccess: (data) =>
      queryClient.setQueryData(
        ["requests", requestId, "recommendations"],
        (previousState) =>
          previousState.map((r) => (r.id === recommendationId ? data : r))
      ),
  });
};
