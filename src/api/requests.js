import { useQuery } from "react-query";
import { get } from "./api"


const getRequest = async (id) => {

    const response = await get(`/requests/${id}`);
    return response;
}


export const useGetRequest = (id, options) => {
    return useQuery(['requests', id],
        () => getRequest(id),
        options);
}