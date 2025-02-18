import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getTokens = async (filters, pageSize, pageNumber) => {
  const response = await get("/api/tokens", {
    params: {
      pageSize: pageSize || 10,
      pageNumber: pageNumber || 1,
    },
  });
  return response;
};

export const useGetTokens = (pageSize, pageNumber) => {
  return useQuery({
    queryKey: ["tokens", pageSize, pageNumber],
    queryFn: () => getTokens({}, pageSize, pageNumber),
  });
};

const getToken = async (id) => {
  const response = await get(`/api/tokens/${id}`);
  return response;
};

export const useGetToken = (id) => {
  return useQuery({
    queryKey: ["tokens", id],
    queryFn: () => getToken(id),
  });
};
