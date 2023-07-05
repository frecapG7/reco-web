import { Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useGetRecommendations, usePostRecommendation } from "../api/recommendations"
import { useRef, useState } from "react";
import { RecommendationForm } from "./Recommendation";
import { CreateRecommendation } from "./CreateRecommendation";



const Content = ({ recommendations }) => {


    if (recommendations.length === 0) return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={2}>

                    No recommendations
                </TableCell>
            </TableRow>
        </TableBody>)

    return (
        <TableBody>
            {recommendations.map((recommendation) => (
                <TableRow component="Paper"
                    key={recommendation._id}>
                    <TableCell component="th" scope="row">
                        {recommendation.field1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {recommendation.field2}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}


export const Recommendations = ({ request }) => {


    const { data, isLoading, isError } = useGetRecommendations(request._id);



    if (isLoading) return (<div>Loading...</div>)

    if (isError) return (<div>Error...</div>)




    return (
        <Container>

            <TableContainer component={Card}>
                <Table>
                    <Content recommendations={data} />
                </Table>
            </TableContainer>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 5,
                py: 5
            }}>
                <CreateRecommendation request={request} />
            </Box>





        </Container>
    )
}