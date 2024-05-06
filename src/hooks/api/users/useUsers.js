import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

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
