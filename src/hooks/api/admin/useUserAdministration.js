import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getUsers = async (filters, pageNumber, pageSize) => {
  const response = await get("/api/admin/users", {
    params: {
      pageNumber,
      pageSize,
    },
  });
  return response;
};

export const useGetUsers = (filters, pageNumber, pageSize, options) => {
  return useQuery({
    queryKey: ["admin", "users", filters, pageNumber, pageSize],
    queryFn: () => getUsers(filters, pageNumber, pageSize),
    ...options,
  });
};

const getUser = async (id) => {
  const result = await get(`/api/admin/users/${id}`);
  return result;
};

export const useGetUser = (id, options) => {
  return useQuery({
    queryKey: ["admin", "user", id],
    queryFn: () => getUser(id),
    ...options,
  });
};

const getLastRecommendations = async (userId) => {
  const response = await get(`/api/admin/users/${userId}/recommendations`);

  return response;
};

export const useGetLastRecommendations = (userId, options) => {
  return useQuery({
    queryKey: ["admin", "users", userId, "recommendations"],
    queryFn: () => getLastRecommendations(userId),
    ...options,
  });
};
