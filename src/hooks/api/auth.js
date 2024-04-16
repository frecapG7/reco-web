import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../../api/api"
import { useAuth } from "../useAuth";


const auth = async (user) => {
    const response = await post('/auth', user);
    return response;
}

export const useLogin = (options) => {
    const {login} = useAuth();
    return useMutation((user) => auth(user), {
        onSuccess: (data) => {
            window.localStorage.setItem('access_token', data.access_token);
            login({
                id: data.id,
                username: data.username,
            });
        },
    });
}

const logout = async () => {
    window.localStorage.removeItem('access_token');
}


export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation(() => logout(),
    {
        onSuccess: () => {
            queryClient.invalidateQueries();
            window.location.reload();   
        },
    });
}