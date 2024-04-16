import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getUsers = async (filters, pageNumber, pageSize) => {
  //   const response = await get("/users", {
  //     params: {
  //       filters,
  //       pageNumber,
  //       pageSize,
  //     },
  //   });

  //   return response.data;

  return [
    {
      id: 1,
      username: "user1",
      email: "test@test.fr",
    },
  ];
};

export const useGetUsers = (filters, pageNumber, pageSize, options) => {
  return useQuery({
    queryKey: ["admin", "users", filters, pageNumber, pageSize],
    queryFn: () => getUsers(filters, pageNumber, pageSize),
    ...options,
  });
};
