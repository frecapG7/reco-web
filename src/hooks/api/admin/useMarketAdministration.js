import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "../index";

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

const postItem = async ({ data, image }) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("body", data);

  console.log(formData);
};

export const usePostItem = (options) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin", "market", "items"]);
    },
    ...options,
  });
};
