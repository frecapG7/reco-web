import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, put } from "../index";

const getItems = async (filters, pageNumber, pageSize) => {
  const response = await get("/api/admin/market/products", {
    params: {
      ...filters,
      pageNumber,
      pageSize,
    },
  });
  return response;
};

export const useGetItems = (filters, pageNumber, pageSize, options) => {
  return useQuery({
    queryKey: ["admin", "market", "items", filters, pageNumber, pageSize],
    queryFn: () => getItems(filters, pageNumber, pageSize),
    ...options,
  });
};

const getItem = async (id) => {
  const response = await get(`/api/admin/market/products/${id}`);
  return response;
};

export const useGetItem = (id, options) => {
  return useQuery({
    queryKey: ["admin", "market", "products", id],
    queryFn: () => getItem(id),
    // enabled: id,
    ...options,
  });
};

const createIcon = async ({ data }) => {
  const response = await post("/api/admin/market/items/icons", data);
  return response;
};

const createConsumable = async ({ data }) => {
  const response = await post("/api/admin/market/items/consumables", data);
  return response;
};

export const usePostItem = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, data }) => {
      if (type === "ICON") {
        return createIcon({ data });
      } else if (type === "CONSUMABLE") {
        return createConsumable({ data });
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
  const response = await put(`/api/admin/market/products/${id}`, data);
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

const verifyUniqueName = async (name) => {
  const response = await post("/api/admin/market/products/verify-name", {
    value: name,
  });
  return response;
};

export const useVerifyUniqueName = () => {
  return useMutation({
    mutationFn: (name) => verifyUniqueName(name),
  });
};
