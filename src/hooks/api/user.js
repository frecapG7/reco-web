import { useQuery } from "@tanstack/react-query";
import { get } from "../../api/api";

const getUser = async (id) => {
  const response = await get(`/users/${id}`);
  return response;
};

export const useGetUser = (id, options) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
    ...options,
  });
};
