import { post } from "./api"
import { useQuery } from "react-query";


const searchRequests = async (search, pageNumber, pageSize) => {
    const response = await post(`/search/requests?pageNumber=${pageNumber}&pageSize=${pageSize}`, { search });
    return response;
}

export const useSearchRequests = (search, pageNumber, pageSize, options) => {
    return useQuery(['search', 'requests', search, pageNumber, pageSize],
        () => searchRequests(search, pageNumber, pageSize),
        options);
}