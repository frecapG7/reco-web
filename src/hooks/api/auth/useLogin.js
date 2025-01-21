import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../index";

const login = async (data) => {
  const response = await post("/api/auth", data);
  return response;
};

export const useLogin = (options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
};
