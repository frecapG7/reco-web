import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, put } from "../../api/api";



const getUser = async (id) => {
    const response = await get(`/users/${id}`);
    return response;
}

export const useGetUser = (id, options) => {
    return useQuery(['users', id],
        () => getUser(id),
        options);
}



const updateUser = async (user) => {
    const response = await put(`/users/${user.id}`, user);
    return response;
}


export const useUpdateUser = (id, options) => {
    const queryClient = useQueryClient();
    return useMutation((user) => updateUser(user), {
        onSuccess: (data) => {
            queryClient.setQueryData(['users', id], data)
        },
    },
        options);
}
