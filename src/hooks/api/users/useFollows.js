import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../../api/index";
import { useAuthSession } from "../../../context/AuthContext";

const getFollows = async (id, params) => {
  const response = await get(`/api/users/${id}/follows`, {
    params,
  });
  return response;
};

export const useGetFollows = (id, pageNumber, pageSize, options) => {
  return useQuery({
    queryKey: ["users", id, "follows", pageNumber, pageSize],
    queryFn: () =>
      getFollows(id, {
        pageNumber,
        pageSize,
      }),
    ...options,
  });
};

const postFollow = async (id, followId) => {
  const response = await post(`/api/users/${id}/follows`, {
    userId: followId,
  });
  return response;
};

export const usePostFollow = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();
  return useMutation({
    mutationFn: (followId) => postFollow(session?.user.id, followId),
    onSuccess: () => {
      queryClient.invalidateQueries([
        "users",
        session?.user.id,
        "follows",
        1,
        10,
      ]);
    },
  });
};
