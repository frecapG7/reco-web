import { useInfiniteQuery } from "@tanstack/react-query";
import { post } from "./api";


const searchRequests = async (search, pageNumber, pageSize) => {
    const response = await post(`/search/requests?pageNumber=${pageNumber}&pageSize=${pageSize}`, { search });
    return response;
}

export const useSearchRequests = (search, options) => {
    // return useQuery(['search', 'requests', search, pageNumber, pageSize],
    //     () => searchRequests(search, pageNumber, pageSize),
    //     options);

    // return useInfiniteQuery(['search', 'requests', search],
    //     ({ pageParam = 1 }) => searchRequests(search, pageParam, 4),
    //     {
    //         getNextPageParam: (lastPage, pages) => {
    //             const currentPage = lastPage.pagination.currentPage;
    //             return currentPage < lastPage.pagination.totalPages ? currentPage + 1 : undefined;
    //         }
    //     },
    // );

    return ({});
};
