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

const validateUsername = async (username) => {
  const response = await post("/api/validate/username", {
    value: username,
  });
  return response;
};

export const useValidateUsername = () => {
  return useMutation({
    mutationFn: (data) => validateUsername(data),
  });
};
