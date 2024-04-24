import { useMutation } from "@tanstack/react-query";
import { post } from "../../../api/api";

const login = async (data) => {
  const response = await post("/api/auth", data);
  return response;
};

export const useLogin = (options) => {
  return useMutation({
    mutationFn: (data) => login(data),
    ...options,
  });
};
