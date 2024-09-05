import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, put } from "../index";

const getItems = async ({ value, type, page, pageSize }) => {
  const response = await get("/api/admin/market/items", {
    params: {
      value,
      type,
      page: page + 1,
      pageSize,
    },
  });
  return response;
};

export const useGetItems = ({ value, type, page, pageSize }, options) => {
  return useQuery({
    queryKey: ["admin", "market", "items", value, type, page, pageSize],
    queryFn: () => getItems({ value, type, page, pageSize }),
    ...options,
  });
};

const getItem = async (id) => {
  const response = await get(`/api/admin/market/items/${id}`);
  return response;
};

export const useGetItem = (id, options) => {
  return useQuery({
    queryKey: ["admin", "market", "items", id],
    queryFn: () => getItem(id),
    // enabled: id,
    ...options,
  });
};

const createIcon = async ({ data }) => {
  const response = await post("/api/admin/market/items/icons", data);
  return response;
};

export const usePostItem = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, data }) => {
      if (type === "ICON") {
        return createIcon({ data });
      } else {
        throw new Error("Invalid type");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "market", "items"]);
    },
    ...options,
  });
};

const updateItem = async ({ id, data }) => {
  const response = await put(`/api/admin/market/items/${id}`, data);
  return response;
};

export const useUpdateItem = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateItem({ id, data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["admin", "market", "items"]).then(() => {
        queryClient.setQueryData(["admin", "market", "items", id], data);
      });
    },
  });
};
