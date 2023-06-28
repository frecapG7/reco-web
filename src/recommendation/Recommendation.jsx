import { forwardRef, useImperativeHandle } from "react";
import { BookRecommendation, BookRecommendationForm } from "./BookRecommendation";
import { MovieRecommendation, MovieRecommendationForm } from "./MovieRecommendation";
import { useForm } from "react-hook-form";


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


export const RecommendationForm = forwardRef(({ requestType, recommendation, onSubmit }, ref) => {


    
    const { control, reset, watch, handleSubmit } = useForm();

    useImperativeHandle(ref, () => ({
        submit: handleSubmit(onSubmit)
    }));
    

    switch (requestType) {
        case "BOOK":
            return <BookRecommendationForm control={control} />
        case "MOVIE":
            return <MovieRecommendationForm control={control} />
        default:
            return null;

    }


});