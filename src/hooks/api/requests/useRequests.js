import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../index";

const getRequests = async (pageSize, pageNumber) => {
  const response = await get("/api/requests", {
    params: {
      pageSize: pageSize || 10,
      pageNumber: pageNumber || 1,
    },
  });

  return response;
};

export const useGetRequests = (pageSize, pageNumber) => {
  return useQuery({
    queryKey: ["requests", pageSize, pageNumber],
    queryFn: () => getRequests(pageSize, pageNumber),
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
