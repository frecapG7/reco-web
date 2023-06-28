import { useMutation, useQuery, useQueryClient } from "react-query";
import { get, post } from "./api";


const getRecommendations = async (requestId) => {
    const response = await get(`/requests/${requestId}/recommendations/`);
    return response;
}

export const useGetRecommendations = (requestId, options) => {
    return useQuery(['requests', requestId, 'recommendations'],
        () => getRecommendations(requestId),
        options);
}



// Post /reqeusts/:id/recommendations
const postRecommendation = async (requestId, recommendation) => {
    const response = await post(`/requests/${requestId}/recommendations/`, recommendation);
    return response;
}

export const usePostRecommendation = (requestId, options) => {
    const queryClient = useQueryClient(); 
    return useMutation((recommendation) => postRecommendation(requestId, recommendation), {
        onSuccess: () => {
            queryClient.invalidateQueries(['requests', requestId, 'recommendations']);
        },
    });
}

