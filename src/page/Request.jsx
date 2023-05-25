import { Box, Container, Paper, Typography } from "@mui/material";
import { useGetRequest } from "../api/requests";
import { useParams } from "react-router-dom";


export const Request = () => {


    const { id } = useParams();
    const { data: request, isLoading, error } = useGetRequest(id);



    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <Container>
            <Typography>Request {request._id}</Typography>

            <Box>
                <Typography variant='h6'>Request Type : {request.requestType}</Typography>
            </Box>

            <Paper elevation={2}
                square>
                <Typography variant="body"
                    paragraph>
                    {request.description}
                </Typography>
            </Paper>


        </Container>
    );




}
