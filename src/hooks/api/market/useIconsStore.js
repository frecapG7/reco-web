import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { post, get } from "../index";
import { useAuthSession } from "../../../context/AuthContext";

/**TODO:
 * -Add sorting (to enable custom sorting by price ...)
 * -Use Sorting or smth for trending
 */
const getIconItems = async ({ value = "", pageSize = 10, pageNumber }) => {
  const response = await get("/api/stores/icons", {
    params: {
      ...(value && { value }),
      pageSize,
      page: pageNumber,
    },
  });
  return response;
};

export const useGetTrendingIconItems = () => {
  return useQuery({
    queryKey: ["stores", "icons", "trending"],
    queryFn: () =>
      getIconItems({
        pageSize: 10,
        pageNumber: 1,
      }),
  });
};

const getIconItem = async (id) => {
  const response = get(`/api/stores/icons/${id}`);
  return response;
};
export const useGetIconItem = (id, options) => {
  return useQuery({
    queryKey: ["stores", "icons", id],
    queryFn: () => getIconItem(id),
    ...options,
  });
};

export const useSearchIconItems = (search, pageSize) => {
  return useInfiniteQuery({
    queryKey: ["stores", "icons", "search", search],
    queryFn: ({ pageParam }) =>
      getIconItems({
        value: search,
        pageSize,
        pageNumber: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.currentPage < lastPage.pagination?.totalPages)
        return lastPage.pagination.currentPage + 1;
      else return undefined;
    },
  });
};

const buyIconItem = async (userId, item) => {
  const response = post(`/api/users/${userId}/purchases`, {
    item,
    quantity: 1,
  });
  return response;
};

export const useBuyIconItem = () => {
  const { session } = useAuthSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => buyIconItem(session.user.id, item),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries("stores"),
        queryClient.invalidateQueries("users"),
      ]).then(() => {});
    },
  });
};
