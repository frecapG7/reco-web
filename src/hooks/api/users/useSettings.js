import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, patch } from "../index";

const getSettings = async (id) => {
  const response = await get(`/api/users/${id}/settings`);
  return response;
};

export const useGetSettings = (id, options) => {
  return useQuery({
    queryKey: ["user", id, "settings"],
    queryFn: () => getSettings(id),
    ...options,
  });
};

const patchSettings = async (id, data) => {
  const response = await patch(`/api/users/${id}/settings`, data);
  return response;
};

export const usePatchSettings = (id, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => patchSettings(id, data),
    onSuccess: () => queryClient.invalidateQueries(["user", id, "settings"]),
    ...options,
  });
};

const resetSettings = async (id) => {
  const response = await del(`/api/users/${id}/settings`);
  return response;
};

export const useResetSettings = (id, options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => resetSettings(id),
    onSuccess: () => queryClient.invalidateQueries(["user", id, "settings"]),
    ...options,
  });
};
