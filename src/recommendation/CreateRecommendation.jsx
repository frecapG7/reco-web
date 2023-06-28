import { Box } from "@mui/material";
import { usePostRecommendation } from "../api/recommendations"
import { RecommendationForm } from "./Recommendation";
import { useRef } from "react";


export const CreateRecommendation = ({ request }) => {


    const postRecommendation = usePostRecommendation(request._id);


    const formRef = useRef();


    return (
        <Box>
            <RecommendationForm ref={formRef} />
        </Box>

    );







}