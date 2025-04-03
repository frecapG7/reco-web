import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post, del } from "../index";

const getRecommendations = async (
  requestId,
  sort,
  order,
  pageSize,
  pageNumber
) => {
  const response = await get(`/api/requests/${requestId}/recommendations`, {
    params: {
      ...(sort && { sort }),
      ...(order && { order }),
      pageSize: pageSize || 1,
      pageNumber: pageNumber || 0,
    },
  });
  return response;
};

export const useGetRecommendations = (requestId, sort, order, pageSize) => {
  return useInfiniteQuery({
    queryKey: [
      "requests",
      requestId,
      "recommendations",
      "sort",
      sort,
      order,
      pageSize,
    ],
    queryFn: ({ pageParam }) =>
      getRecommendations(requestId, sort, order, pageSize, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      return undefined;
    },
  });
};

const getRecommendation = async (recommendationId) => {
  const response = await get(`/api/recommendations/${recommendationId}`);
  return response;
};
export const useGetRecommendation = (recommendationId) => {
  return useQuery({
    queryKey: ["recommendations", recommendationId],
    queryFn: () => getRecommendation(recommendationId),
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

const createRecommendation = async (recommendation) => {
  const response = await post(`/api/recommendations`, recommendation);
  return response;
};
export const useCreateRecommendation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createRecommendation(data),
    onSuccess: () => queryClient.invalidateQueries("recommendations"),
  });
};

const createRequestRecommendation = async (requestId, recommendation) => {
  const response = await post(
    `/api/requests/${requestId}/recommendations`,
    recommendation
  );
  return response;
};

export const useCreateRequestRecommendation = (requestId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createRequestRecommendation(requestId, data),
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
