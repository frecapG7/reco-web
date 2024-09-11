import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "../index";

const getUser = async (id) => {
  const response = await get(`/api/users/${id}`);
  return response;
};

export const useGetUser = (id, options) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    ...options,
  });
};

const createUser = async (data, token) => {
  const response = await post("/api/users", data, {
    params: { token },
  });
  return response;
};

export const useCreateUser = (options) => {
  return useMutation({
    mutationFn: ({ data, token }) => createUser(data, token),
    onSuccess: () => {},
    ...options,
  });
};

const getLastRequests = async (id) => {
  return [
    {
      id: 1,
      requestType: "food",
      title: "Burger",
      created: new Date(),
    },
    {
      id: 2,
      requestType: "drink",
      title: "Coke",
      created: new Date(),
    },
  ];
};

export const useGetLastRequests = (id, options) => {
  return useQuery({
    queryKey: ["users", id, "requests"],
    queryFn: () => getLastRequests(id),
    ...options,
  });
};

const getLastRecommendations = async (id) => {
  return [
    {
      id: 1,
      requestType: "food",
      title: "Burger",
      created: new Date(),
    },
    {
      id: 2,
      requestType: "drink",
      title: "Coke",
      created: new Date(),
    },
  ];
};

export const useGetLastRecommendations = (id, options) => {
  return useQuery({
    queryKey: ["users", id, "requests"],
    queryFn: () => getLastRecommendations(id),
    ...options,
  });
};
