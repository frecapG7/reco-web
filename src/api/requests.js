import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post } from "./api"


const getRequest = async (id) => {

    const response = await get(`/requests/${id}`);
    return response;
}


export const useGetRequest = (id, options) => {
    return useQuery(['requests', id],
        () => getRequest(id),
        options);
}



const getMyRequests = async (pageSize, pageNumber, status) => {
    // return [
    //     {
    //         id: '1',
    //         requestType: 'BOOK',
    //         duration: '1W',
    //         description: 'Lorem Ipsum ...',
    //         status: 'PENDING',
    //         // Ideas
    //         recommendationCount: 3,
    //         unseenRecommendationCount: 2,
    //         created_at: new Date()
    //     },
    //     {
    //         id: '2',
    //         requestType: 'BOOK',
    //         duration: '1W',
    //         description: 'Lorem Ipsum ...',
    //         status: 'CLOSED',
    //         // Ideas
    //         recommendationCount: 3,
    //         unseenRecommendationCount: 2,
    //         created_at: new Date()
    //     }
    // ]
    const response = await get(`/requests/me?pageSize=${pageSize}&pageNumber=${pageNumber}`);
    return response;
}


export const useGetMyRequests = (pageSize, pageNumber, options) => {
    return useQuery(['requests', 'me', pageSize, pageNumber],
        () => getMyRequests(pageSize, pageNumber),
        options);
}

const postRequest = async (request) => {
    const response = await post(`/requests`, request);
    return response;
}

export const usePostRequest = (options) => {
    const queryClient = useQueryClient();
    return useMutation((request) => postRequest(request), {
        onSuccess: () => {
            queryClient.invalidateQueries(['requests', 'me'])
        },
    },
        options);
}