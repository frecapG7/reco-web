import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { get, put } from "../../api/index";

const getNotifications = async ({
  id,
  page = 1,
  pageSize = 10,
  onlyUnread = false,
}) => {
  const response = await get(`/api/users/${id}/notifications`, {
    params: {
      page,
      pageSize,
      onlyUnread,
    },
  });
  return response;
};

export const useNotifications = ({ id, pageSize, onlyUnread, options }) => {
  return useInfiniteQuery({
    queryKey: ["users", id, "notifications"],
    queryFn: ({ pageParam }) =>
      getNotifications({
        id,
        page: pageParam,
        pageSize,
        onlyUnread,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
    ...options,
  });
};

const getUnreadCount = async ({ userId }) => {
  const response = await get(`/api/users/${userId}/notifications/unread`);
  return response;
};

export const useUnreadCount = ({ userId, options }) => {
  return useQuery({
    queryKey: ["users", userId, "notifications", "unread"],
    queryFn: () => getUnreadCount({ userId }),
    ...options,
  });
};

const markAsRead = async ({ userId, notificationId }) => {
  const response = await put(
    `/api/users/${userId}/notifications/${notificationId}/read`
  );
  return response;
};

export const useMarkAsRead = ({ userId, options }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ notificationId }) =>
      markAsRead({
        userId,
        notificationId,
      }),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["users", userId, "notifications"])
        .then(() => {
          queryClient.setQueryData(
            ["users", userId, "notifications", "unread"],
            (prev) => prev - 1
          );
        });
    },
    ...options,
  });
};

const markAllAsRead = async ({ userId }) => {
  const response = await put(`/api/users/${userId}/notifications/read/all`);
  return response;
};

export const useMarkAllAsRead = ({ userId, options }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => markAllAsRead({ userId }),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["users", userId, "notifications"])
        .then(() => {
          queryClient.setQueryData(
            ["users", userId, "notifications", "unread"],
            0
          );
        });
    },
    ...options,
  });
};
