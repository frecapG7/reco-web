import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, post } from "../index";

const getRequests = async (pageSize, pageNumber, filters) => {
  const response = await get("/api/requests", {
    params: {
      pageSize: pageSize || 1,
      pageNumber: pageNumber || 0,
      ...(filters?.search && { search: filters.search }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.status && { status: filters.status }),
    },
  });

  return response;
};

export const useGetRequests = (filters) => {
  return useInfiniteQuery({
    queryKey: ["requests", filters],
    queryFn: ({ pageParam }) => getRequests(10, pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      return undefined;
    },
  });
};

const getRequest = async (id) => {
  const response = await get(`/api/requests/${id}`);
  return response;
};

export const useGetRequest = (id) => {
  return useQuery({
    queryKey: ["requests", id],
    queryFn: () => getRequest(id),
  });
};

const postRequest = async (data) => {
  const response = await post("/api/requests", data);
  return response;
};

export const usePostRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRequest,
    onSuccess: () => {
      queryClient.invalidateQueries("requests").then(() => {});
    },
  });
};
