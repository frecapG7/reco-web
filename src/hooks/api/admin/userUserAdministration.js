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
    {
      id: 1,
      username: "user1",
      email: "test@test.fr",
    },
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

const getUser = (id) => {
  // return get(`/admin/users/${id}`);
  return {
    id: "65df6cc757b41fec4d7c3055",
    name: "Mytrandir",
    title: "Lord of the fallen",
    avatar: "https://i.pravatar.cc/100",
    balance: 150,
    created: "2021-08-01T00:00:00.000Z",
  };
};

export const useGetUser = (id, options) => {
  return useQuery({
    queryKey: ["admin", "user", id],
    queryFn: () => getUser(id),
    ...options,
  });
};
