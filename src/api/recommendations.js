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


// Likes recommendation
const likeRecommendation = async (requestId, recommendationId) => {
    const response = await post(`/requests/${requestId}/recommendations/${recommendationId}/like/`);
    return response;

}

export const useLikeRecommendation = (requestId, recommendationId, options) => {
    const queryClient = useQueryClient();
    return useMutation(() => likeRecommendation(requestId, recommendationId), {
        onSuccess: (data) => {
            //TODO: setQueryData

            // Set the query data to the new value

            queryClient.setQueryData(['requests', requestId, 'recommendations'],
                prevState => {
                    return prevState.map(recommendation => (recommendation.id === recommendationId) ? data : recommendation);
                });
        },
    });
}

// Dislikes recommendation
const dislikeRecommendation = async (requestId, recommendationId) => {
    const response = await delete (`/requests/${requestId}/recommendations/${recommendationId}/like`);
    return response;
}

export const useDislikeRecommendation = (requestId, recommendationId, options) => {
    const queryClient = useQueryClient();
    return useMutation(() => dislikeRecommendation(requestId, recommendationId), {
        onSuccess: (data) => {
            queryClient.setQueryData(['requests', requestId, 'recommendations'],
                prevState => {
                    return prevState.map(recommendation => (recommendation.id === recommendationId) ? data : recommendation);
                });
        }
    });
}