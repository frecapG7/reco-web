import { BookRecommendation } from "./BookRecommendation";
import { MovieRecommendation } from "./MovieRecommendation";


export const Recommendation = ({ requestType, recommendation }) => {

    switch (requestType) {
        case "BOOK":
            return <BookRecommendation recommendation={recommendation} />
        case "MOVIE":
            return <MovieRecommendation recommendation={recommendation} />
        default:
            return null;

    }
}