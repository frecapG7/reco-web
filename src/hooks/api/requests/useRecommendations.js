import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post, del } from "../index";

const getRecommendations = async (requestId, sort, pageSize, pageNumber) => {
  const response = await get(`/api/requests/${requestId}/recommendations`, {
    params: {
      sort: sort || "likes",
      pageSize: pageSize || 1,
      pageNumber: pageNumber || 0,
    },
  });
  return response;
};

export const useGetRecommendations = (requestId, sort, pageSize) => {
  return useInfiniteQuery({
    queryKey: [
      "requests",
      requestId,
      "recommendations",
      "sort",
      sort,
      pageSize,
    ],
    queryFn: ({ pageParam }) =>
      getRecommendations(requestId, sort, pageSize, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      return undefined;
    },
  });
};

const getEmbedRecommendation = async (url) => {
  const response = await get(`/api/recommendations/embed`, {
    params: {
      url,
    },
  });
  return response;
};

export const useGetEmbedRecommendation = (url, options) => {
  return useQuery({
    queryKey: ["recommendations", "embed", url],
    queryFn: () => getEmbedRecommendation(url),
    ...options,
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

const likeRecommendation = async (recommendationId) => {
  const response = await post(`/api/recommendations/${recommendationId}/like`);
  return response;
};

export const useLikeRecommendation = (recommendationId) => {
  return useMutation({
    mutationFn: () => likeRecommendation(recommendationId),
  });
};

const unlikeRecommendation = async (recommendationId) => {
  const response = await del(`/api/recommendations/${recommendationId}/like`);
  return response;
};

export const useUnlikeRecommendation = (recommendationId) => {
  return useMutation({
    mutationFn: () => unlikeRecommendation(recommendationId),
  });
};
