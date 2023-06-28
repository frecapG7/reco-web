import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useGetRecommendations, usePostRecommendation } from "../api/recommendations"
import { useRef, useState } from "react";
import { RecommendationForm } from "./Recommendation";



const Content = ({ recommendations }) => {


    if (recommendations.length === 0) return (<div>No recommendations</div>)

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

    const [openCreate, setOpenCreate] = useState(false);


    const postRecommendation = usePostRecommendation(request._id);
    const formRef = useRef();

    const handleSubmit = (data) => {
        postRecommendation.mutate(data);
    }


    if (isLoading) return (<div>Loading...</div>)

    if (isError) return (<div>Error...</div>)




    return (
        <Container>
            <Typography variant="h4" component="h4" gutterBottom>
                Recommendations
            </Typography>

            <Table>
                <TableContainer>
                    <Content recommendations={data} />
                </TableContainer>
            </Table>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained"
                    color="success"
                    onClick={() => setOpenCreate(true)}>
                    Recommend
                </Button>
            </Box>


            <Dialog open={openCreate}
                onClose={() => setOpenCreate(false)}>
                <DialogTitle>Create a recommendation</DialogTitle>
                <DialogContent>
                    <RecommendationForm ref={formRef}
                        requestType={request.requestType}
                        onSubmit={handleSubmit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                        color="success"
                        onClick={() => formRef.current?.submit()}>
                        Recommend
                    </Button>
                    <Button variant="contained"
                        color="error"
                        onClick={() => setOpenCreate(false)} >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


        </Container>
    )
}