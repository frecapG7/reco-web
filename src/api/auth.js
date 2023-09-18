import { useMutation } from "react-query";
import { post } from "./api"


const login = async (user) => {
    const response = await post('/auth', user);
    return response;
}

export const useLogin = (options) => {
    return useMutation((user) => login(user), {
        onSuccess: (data) => {
            window.localStorage.setItem('access_token', data.access_token);
        },
    });
}