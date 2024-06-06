import { useMutation } from "@tanstack/react-query";
import { post } from "..";

const validateToken = async (token) => {
  const response = await post("/api/validate/token", {
    value: token,
  });
  return response;
};

export const useValidateToken = () => {
  return useMutation({
    mutationFn: (data) => validateToken(data),
  });
};
