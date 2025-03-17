import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getMarketProducts = async (params) => {
  const response = await get("/api/market/products", {
    params,
  });
  return response;
};

export const useGetMarketProducts = (filters, pageSize, pageNumber) => {
  return useQuery({
    queryKey: ["market", "products", filters, pageSize, pageNumber],
    queryFn: () =>
      getMarketProducts({
        ...filters,
        pageSize,
        pageNumber,
      }),
  });
};

const getMarketProduct = async (name) => {
  const response = await get(`/api/market/products/${name}`);
  return response;
};

export const useGetMarketProduct = (name) => {
  return useQuery({
    queryKey: ["market", "products", name],
    queryFn: () => getMarketProduct(name),
  });
};
