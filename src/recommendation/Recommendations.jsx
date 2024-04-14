import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Container, IconButton, Tooltip } from "@mui/material";
import { useGetRecommendations } from "../api/recommendations";
import { CreateRecommendation } from "./CreateRecommendation";
import { Recommendation } from "./Recommendation";
import { Fragment } from 'react';


export const Recommendations = ({ request }) => {


    const { data: recommendations, isLoading, isError } = useGetRecommendations(request.id);



    if (isLoading) return (<div>Loading...</div>)

    if (isError) return (<div>Error...</div>)


    if (recommendations?.length === 0) return (
        <Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 5,
                py: 5
            }}>
                <CreateRecommendation request={request} />
            </Box>
        </Container>
    );


    return (
        <Container>
            {recommendations.map((recommendation) => (
               <Fragment key={recommendation.id}>
                    <Recommendation request={request} recommendation={recommendation} />
                </Fragment>
            )
            )}
        </Container>
    )

}