import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "./api";

const getRequest = async (id) => {
  const response = await get(`/requests/${id}`);
  return response;
};

export const useGetRequest = (id, options) => {
  return useQuery(["requests", id], () => getRequest(id), options);
};

const getMyRequests = async (pageSize, pageNumber, status) => {
  const response = await get(
    `/requests/me?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
  return response;
};

export const useGetMyRequests = (pageSize, pageNumber, options) => {
  return useQuery(
    ["requests", "me", pageSize, pageNumber],
    () => getMyRequests(pageSize, pageNumber),
    options
  );
};

const postRequest = async (request) => {
  const response = await post(`/requests`, request);
  return response;
};

export const usePostRequest = (options) => {
  const queryClient = useQueryClient();
  return useMutation(
    (request) => postRequest(request),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["requests", "me"]);
      },
    },
    options
  );
};
