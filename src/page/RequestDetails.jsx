import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useGetRequest } from "../api/requests";
import { useParams } from "react-router-dom";
import { Enum } from "../utils/Enum";


export const RequestDetails = () => {


    const { id } = useParams();
    const { data: request, isLoading, error } = useGetRequest(id);



    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <Container>
            <Paper elevation={2}
                square>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="title">
                                TODO: user is looking for a <Enum value={request.requestType} enumName="REQUEST_TYPE" />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                {request.title}
                            </Typography>
                        </Grid>
                    </Grid>
                <Typography variant="body"
                    paragraph>
                    {request.description}
                </Typography>
            </Paper>


        </Container>
    );




}
