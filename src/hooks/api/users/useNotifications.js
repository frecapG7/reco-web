import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { get } from "../../api/index";

const data = [
  {
    id: 1,
    createdAt: new Date(),
    type: "like_request",
    from: {
      id: 1,
      name: "John Doe",
    },
  },
  {
    id: 2,
    createdAt: new Date(),
    type: "like_request",
    from: {
      id: 2,
      name: "Jane Doe",
    },
  },
  {
    id: 3,
    createdAt: new Date(),
    type: "like_request",
    from: {
      id: 2,
      name: "Jane Doe",
    },
  },
  {
    id: 4,
    createdAt: new Date(),
    type: "like_request",
    from: {
      id: 2,
      name: "Jane Doe",
    },
  },
  {
    id: 5,
    createdAt: new Date(),
    type: "like_request",
    from: {
      id: 2,
      name: "Jane Doe",
    },
  },
];

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
}
